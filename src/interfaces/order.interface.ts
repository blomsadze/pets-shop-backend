import { ObjectId } from 'mongodb';

export interface IOrder {
  products: {
    product: ObjectId;
    quantity: number;
  }[];
  user: {
    name: string;
    userId: ObjectId;
  };
}
