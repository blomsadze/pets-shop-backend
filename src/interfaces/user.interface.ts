export interface IUser {
  name: string;
  email: string;
  _id: string;
  password: string;
  role: 'admin' | 'user';
  cart: {
    items: {
      productId: string;
      quantity: number;
    }[];
  };
}
