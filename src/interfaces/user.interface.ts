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
  // addToCart: (productId: string) => Promise<void>;
  // removeFromCart: (productId: string) => Promise<void>;
  // clearCart: () => Promise<void>;
  // populate(path: string): Promise<IUser>;
}
