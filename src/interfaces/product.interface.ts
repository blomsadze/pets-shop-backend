import { ObjectId } from 'mongoose';

export interface IProduct {
  _id: string;
  name_ka: string;
  name_en: string;
  description_ka: string;
  description_en: string;
  price: number;
  image: {
    url: string;
    publicId: string;
  };
  user_id: ObjectId;
  category_id: ObjectId;
  subcategory_id: ObjectId;
  sales_count: number;
}
