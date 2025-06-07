import { NextFunction, Request, Response } from 'express';

import Product from '../models/product.model';
import Category from '../models/category.model';

// utils
import { validationHandler } from '../utils/validationHandler.util';
import { deleteImage, uploadImage } from '../utils/uploadImage.util';
import { asyncHandler } from '../utils/asyncHandler.util';
import { successHandler } from '../utils/successHadler.util';
import { errorHandler } from '../utils/errorHandler.util';
import { productValidationSchema } from '../validations/product.validation';
import { categoryValidationSchema } from '../validations/category.validation';

export const addCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name_ka, name_en } = req.body;

    const { error } = categoryValidationSchema.validate(req.body);
    if (error) return validationHandler(res, error);

    const category = new Category({
      name_ka,
      name_en
    });

    await category.save();

    return successHandler(res, category, 'category added successfully', 201);
  }
);
export const editCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name_ka, name_en } = req.body;

    const category = await Category.findById(id);
    if (!category)
      return errorHandler(res, 'Category with given id not found', 404);

    const { error } = categoryValidationSchema.validate(req.body, {
      abortEarly: false
    });

    if (error) return validationHandler(res, error);

    category.name_ka = name_ka;
    category.name_en = name_en;

    await category.save();

    return successHandler(res, category, 'Category updated successfully');
  }
);
export const deleteCategory = asyncHandler(
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category)
      return errorHandler(res, 'Category with given id not found', 404);

    await Category.findByIdAndDelete(id);

    if (!category)
      return errorHandler(res, 'Category with given id not found', 404);

    return successHandler(res, null, 'Category deleted successfully');
  })
);

// toys
export const addProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name_ka, name_en, description, category_id, price } = req.body;
    const image = req.file;

    const { error } = productValidationSchema.validate(req.body);
    if (error) return validationHandler(res, error);

    let imageDetails = null;

    if (image) {
      try {
        const result = await uploadImage(req);
        if (result && result.url && result.publicId) {
          imageDetails = result;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Failed to upload image.' });
      }
    } else {
      return validationHandler(res, {
        details: [
          {
            message: 'image is required',
            path: [Array]
          }
        ]
      });
    }

    const product = new Product({
      name_ka,
      name_en,
      description,
      price,
      image: imageDetails,
      category_id,
      userId: req.user._id
    });

    await product.save();

    return successHandler(res, product, 'Product added successfully', 201);
  }
);
export const editProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name_ka, name_en, description, category_id, price } = req.body;
    const image = req.file;

    const product = await Product.findById(id);
    if (!product)
      return errorHandler(res, 'Product with given id not found', 404);

    const { error } = productValidationSchema.validate(req.body, {
      abortEarly: false
    });

    if (error) return validationHandler(res, error);

    if (image) {
      try {
        const result = await uploadImage(req);
        if (result && result.url && result.publicId) {
          await deleteImage(product.image.publicId);
          product.image = {
            url: result.url,
            publicId: result.publicId
          };
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Failed to upload image.' });
      }
    }

    product.name_ka = name_ka;
    product.name_en = name_en;
    product.category_id = category_id;
    product.description = description;
    product.price = price;

    await product.save();

    return successHandler(res, product, 'Product updated successfully');
  }
);
export const deleteProduct = asyncHandler(
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let imagePublicId = null;
    const product = await Product.findById(id);

    if (!product)
      return errorHandler(res, 'Product with given id not found', 404);

    imagePublicId = product?.image?.publicId;

    await Product.findByIdAndDelete(id);
    await deleteImage(imagePublicId);

    if (!product)
      return errorHandler(res, 'Product with given id not found', 404);

    return successHandler(res, null, 'Product deleted successfully');
  })
);
