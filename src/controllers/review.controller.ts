import { NextFunction, Request, Response } from 'express';
import Review from '../models/review.model';

import { reviewValidationSchema } from '../validations/review.validation';
import { asyncHandler } from '../utils/asyncHandler.util';
import { validationHandler } from '../utils/validationHandler.util';
import { successHandler } from '../utils/successHadler.util';

export const addReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId, rating, review } = req.body;

    const { error } = reviewValidationSchema.validate(req.body);
    if (error) return validationHandler(res, error);

    const newReview = new Review({
      productId,
      rating,
      review,
      userId: req.user._id
    });

    await newReview.save();
    return successHandler(res, newReview, 'review added successfully', 201);
  }
);

export const getProductReviews = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { limit = 6 } = req.query;
    const limitNum = parseInt(limit as string, 10) || 6;

    const { productId } = req.params;
    if (!productId)
      return validationHandler(res, { productId: 'product id is required' });

    const reviews = await Review.find({
      productId
    })
      .populate('userId', 'name')
      .sort({ createdAt: -1 })
      .limit(limitNum);

    const totalProducts = await Review.countDocuments();

    return successHandler(res, reviews, 'OK', 200, {
      limit: limitNum,
      totalPages: Math.ceil(totalProducts / limitNum)
    });
  }
);

export const getTopRatedProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await Review.find()
      .sort({ rating: -1 })
      .limit(10)
      .populate(
        'userId',
        'first_name_ka last_name_ka first_name_en last_name_en'
      );

    return successHandler(res, reviews, 'ok');
  }
);
