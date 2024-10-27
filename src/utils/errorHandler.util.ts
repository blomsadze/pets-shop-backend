import { Request, Response } from 'express';

export const globalErrorHandler = (err: any, req: Request, res: Response) => {
  // Handle Multer-specific errors
  if (
    err ===
    'Invalid file format. Please upload a PNG, JPG, JPEG, or WEBP image.'
  ) {
    console.error('multer error:', err);
    return res.status(422).json({
      message: 'Validation failed',
      errors: [err]
    });
  }

  // Check for Mongoose validation error
  if (err.name === 'ValidationError') {
    console.error('mongoose validation error:', err);
    const messages = Object.values(err.errors).map((val: any) => val.message);
    return res.status(400).json({
      message: 'Validation failed',
      errors: messages
    });
  }

  // Generic server error
  console.error('Server Error:', err);
  return res.status(500).json({
    message: 'Server error'
  });
};

export const errorHandler = (res: any, message: string, status = 404) => {
  console.log(message);
  return res.status(status).json({
    message
  });
};
