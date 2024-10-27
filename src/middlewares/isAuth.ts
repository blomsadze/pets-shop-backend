import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth.util';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verifyToken(token);
    console.log('decoded', decoded);
    // req.user = decoded;
    // req.session.token = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
