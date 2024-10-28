import { ObjectId } from 'mongodb';

export interface IOrder {
  products: {
    product: ObjectId;
    model: string;
    quantity: number;
  }[];
  user: {
    name: string;
    userId: ObjectId;
  };
}
