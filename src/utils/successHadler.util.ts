import { Response } from 'express';

export const successHandler = (
  res: Response,
  data: any,
  message = 'Request successful',
  statusCode = 200
  // meta = {}
) => {
  return res.status(statusCode).json({
    data,
    status: statusCode,
    message
    // meta,
  });
};
