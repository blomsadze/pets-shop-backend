import 'express-session';

declare module 'express-session' {
  interface SessionData {
    isLoggedIn: boolean;
    user: {
      name: string;
      email: string;
      _id: string;
    };
  }
}
