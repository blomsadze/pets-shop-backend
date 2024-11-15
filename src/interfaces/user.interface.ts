export interface IUser {
  first_name_ka: string;
  first_name_en: string;
  last_name_ka: string;
  last_name_en: string;
  gender: 'male' | 'female';
  birthday_year: number;
  address_ka: string;
  address_en: string;
  phone: string;
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
