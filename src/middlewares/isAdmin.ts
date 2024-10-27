import { Request, Response, NextFunction } from 'express';

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Permission denied' });
  return;
};
