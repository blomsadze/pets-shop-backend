import { NextFunction, Request, Response } from 'express';

// models
import Product from '../models/product.model';
import Category from '../models/category.model';

// utils
import { asyncHandler } from '../utils/asyncHandler.util';
import { successHandler } from '../utils/successHadler.util';
import { errorHandler } from '../utils/errorHandler.util';

export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { category, page = '1', limit = '10' } = req.query;

    // Parse page and limit values safely
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;

    const filter: { category_id?: string } = {};

    if (category) {
      const foundCategory = await Category.findOne({ name_en: category });
      if (!foundCategory) {
        return errorHandler(res, 'Incorrect category', 404);
      }
      filter.category_id = foundCategory._id.toString();
    }

    const products = await Product.find(filter)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const totalProducts = await Product.countDocuments(filter);

    return successHandler(res, products, 'Products fetched successfully', 200, {
      totalProducts,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalProducts / limitNum)
    });
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

export const newArrivals = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { limit = 10 } = req.query;
    const limitNum = parseInt(limit as string, 10) || 10;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(limitNum);

    return successHandler(res, products);
  }
);

// integrate later to checkout route
export const updateSalesCount = async (productId: string) => {
  try {
    await Product.findByIdAndUpdate(productId, { $inc: { salesCount: 1 } });
  } catch (error) {
    console.error('Error updating sales count:', error);
  }
};

export const getTopSellingProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { limit = 10 } = req.query;
    const limitNum = parseInt(limit as string, 10) || 10;

    const products = await Product.find()
      .sort({ sales_count: -1 })
      .limit(limitNum);

    return successHandler(res, products);
  }
);
