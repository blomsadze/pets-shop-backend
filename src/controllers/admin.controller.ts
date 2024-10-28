import { NextFunction, Request, Response } from 'express';

import Toy from '../models/toy.model';
import Accessory from '../models/accessory.model';

// utils
import { validationHandler } from '../utils/validationHandler.util';
import { deleteImage, uploadImage } from '../utils/uploadImage.util';
import { asyncHandler } from '../utils/asyncHandler.util';
import { successHandler } from '../utils/successHadler.util';
import { errorHandler } from '../utils/errorHandler.util';
import { toyValidationSchema } from '../validations/toy.validation';
import { accessoryValidationSchema } from '../validations/accessory.validation';

// toys
export const addToy = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price } = req.body;
    const image = req.file;

    const { error } = toyValidationSchema.validate(req.body);
    if (error) return validationHandler(res, error);

    let imageDetails = null;

    if (image) {
      try {
        const result = await uploadImage(req);
        if (result && result.url && result.publicId) {
          imageDetails = result;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Failed to upload image.' });
      }
    } else {
      return validationHandler(res, {
        details: [
          {
            message: 'image is required',
            path: [Array]
          }
        ]
      });
    }

    const toy = new Toy({
      name,
      description,
      price,
      image: imageDetails,
      userId: req.user._id
    });

    await toy.save();
    return successHandler(res, toy, 'Toy added successfully', 201);
  }
);
export const editToy = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const image = req.file;

    const toy = await Toy.findById(id);
    if (!toy) return errorHandler(res, 'Toy with given id not found', 404);

    const { error } = toyValidationSchema.validate(req.body, {
      abortEarly: false
    });

    if (error) return validationHandler(res, error);

    if (image) {
      try {
        const result = await uploadImage(req);
        if (result && result.url && result.publicId) {
          await deleteImage(toy.image.publicId);
          toy.image = {
            url: result.url,
            publicId: result.publicId
          };
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Failed to upload image.' });
      }
    }

    toy.name = name;
    toy.description = description;
    toy.price = price;

    await toy.save();
    return successHandler(res, toy, 'Toy updated successfully');
  }
);
export const deleteToy = asyncHandler(
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let imagePublicId = null;
    const toy = await Toy.findById(id);

    if (!toy) return errorHandler(res, 'Toy with given id not found', 404);

    imagePublicId = toy?.image?.publicId;

    await Toy.findByIdAndDelete(id);
    await deleteImage(imagePublicId);

    if (!toy) return errorHandler(res, 'Toy with given id not found', 404);

    return successHandler(res, null, 'Toy deleted successfully');
  })
);

// accessories
export const addAccessory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price } = req.body;
    const image = req.file;

    const { error } = accessoryValidationSchema.validate(req.body);
    if (error) return validationHandler(res, error);

    let imageDetails = null;

    if (image) {
      try {
        const result = await uploadImage(req);
        if (result && result.url && result.publicId) {
          imageDetails = result;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Failed to upload image.' });
      }
    } else {
      return validationHandler(res, {
        details: [
          {
            message: 'image is required',
            path: [Array]
          }
        ]
      });
    }

    const accessory = new Accessory({
      name,
      description,
      price,
      image: imageDetails,
      userId: req.user._id
    });

    await accessory.save();
    return successHandler(res, accessory, 'Accessory added successfully', 201);
  }
);
export const editAccessory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const image = req.file;

    const accessory = await Accessory.findById(id);
    if (!accessory)
      return errorHandler(res, 'Accessory with given id not found', 404);

    const { error } = accessoryValidationSchema.validate(req.body, {
      abortEarly: false
    });

    if (error) return validationHandler(res, error);

    if (image) {
      try {
        const result = await uploadImage(req);
        if (result && result.url && result.publicId) {
          await deleteImage(accessory.image.publicId);
          accessory.image = {
            url: result.url,
            publicId: result.publicId
          };
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Failed to upload image.' });
      }
    }

    accessory.name = name;
    accessory.description = description;
    accessory.price = price;

    await accessory.save();
    return successHandler(res, accessory, 'Accessory updated successfully');
  }
);
export const deleteAccessory = asyncHandler(
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let imagePublicId = null;
    const accessory = await Accessory.findById(id);

    if (!accessory)
      return errorHandler(res, 'ccessory with given id not found', 404);

    imagePublicId = accessory?.image?.publicId;

    await Accessory.findByIdAndDelete(id);
    await deleteImage(imagePublicId);

    if (!accessory)
      return errorHandler(res, 'Accessory with given id not found', 404);

    return successHandler(res, null, 'ccessory deleted successfully');
  })
);
