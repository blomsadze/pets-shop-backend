import { ObjectId } from 'mongoose';

export interface IAccessory {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
    publicId: string;
  };
  userId: ObjectId;
}
