import { NextFunction, Request, Response } from 'express';

export const asyncHandler = (callback: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
