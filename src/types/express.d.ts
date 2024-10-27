import { IUser } from '../models/user.model.ts';

declare global {
  namespace Express {
    interface Request {
      user: IUser; // or the specific user type you're using
    }
  }
}
