import 'express-session';

declare module 'express-session' {
  interface SessionData {
    token: any;
    user: {
      name: string;
      email: string;
      _id: string;
    };
  }
}
