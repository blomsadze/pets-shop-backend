import { NextFunction, Request, Response } from 'express';

import Product from '../models/product.model';

// utils
import { asyncHandler } from '../utils/asyncHandler.util';
import { successHandler } from '../utils/successHadler.util';
import { errorHandler } from '../utils/errorHandler.util';

export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find();
    return successHandler(res, products);
  }
);

export const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return errorHandler(res, 'Product with given id not found', 404);

    return successHandler(res, product);
  }
);
