import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { bufferToDataURI } from './datauri.util';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (fileString?: string, format?: string) => {
  try {
    const { uploader } = cloudinary.v2;

    const res = await uploader.upload(
      `data:image/${format};base64,${fileString}`
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (req: any) => {
  try {
    if (!req.file) return;
    const { file } = req;

    const fileFormat = file?.mimetype.split('/')[1];
    const { base64 } = bufferToDataURI(fileFormat, file?.buffer);

    const imageDetails = await uploadToCloudinary(base64, fileFormat);

    return {
      url: imageDetails?.secure_url,
      publicId: imageDetails?.public_id
    };
  } catch (error) {
    console.log('cloudinaryError', error);
  }
};

export const deleteImage = async (public_id: string) => {
  try {
    const { uploader } = cloudinary.v2;
    await uploader.destroy(public_id);
  } catch (error) {
    console.log(error);
  }
};
