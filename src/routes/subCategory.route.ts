import express from 'express';
import {
  getSubCategories,
  getSubCategoryByCategoryId
} from '../controllers/subCategory.controller';

export const subCategoryRoutes = express.Router();

subCategoryRoutes.get('/subcategories', getSubCategories);
subCategoryRoutes.get('/subcategories/:id', getSubCategoryByCategoryId);
