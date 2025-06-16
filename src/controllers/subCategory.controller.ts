import { NextFunction, Request, Response } from 'express';

import SubCategory from '../models/subCategory.model';

// utils
import { asyncHandler } from '../utils/asyncHandler.util';
import { successHandler } from '../utils/successHadler.util';

export const getSubCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const subcategories = await SubCategory.find();
    return successHandler(res, subcategories);
  }
);

export const getSubCategoryByCategoryId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const subcategories = await SubCategory.find({ category_id: id });

    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({
        message: 'No subcategories found for this category'
      });
    }

    return successHandler(
      res,
      subcategories,
      'Subcategories fetched successfully'
    );
  }
);
