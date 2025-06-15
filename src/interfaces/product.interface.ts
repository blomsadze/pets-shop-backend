import { ObjectId } from 'mongoose';

export interface IProduct {
  _id: string;
  name_ka: string;
  name_en: string;
  description: string;
  price: number;
  image: {
    url: string;
    publicId: string;
  };
  user_id: ObjectId;
  categoryId: ObjectId;
  subcategoryId: ObjectId;
  sales_count: number;
}
