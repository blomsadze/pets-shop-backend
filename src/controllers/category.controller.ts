import { NextFunction, Request, Response } from 'express';

import Category from '../models/category.model';

// utils
import { asyncHandler } from '../utils/asyncHandler.util';
import { successHandler } from '../utils/successHadler.util';

export const getCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find();
    return successHandler(res, categories);
  }
);
