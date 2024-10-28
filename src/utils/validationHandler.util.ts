import { Response } from 'express';
import { errorHandler } from './errorHandler.util.js';

export const validationHandler = (res: Response, error: any) => {
  const errors = error.details.reduce(
    (
      acc: { [x: string]: string },
      current: { path: (string | number)[]; message: string }
    ) => {
      acc[current.path[0]] = current.message;
      return acc;
    },
    {}
  );

  return errorHandler(res, errors, 400);
};
