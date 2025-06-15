import express from 'express';

import {
  addCategory,
  addProduct,
  editCategory,
  editProduct,
  deleteCategory,
  deleteProduct,
  addSubCategory,
  deleteSubCategory,
  editSubCategory
} from '../controllers/admin.controller';

import { isAuth } from '../middlewares/isAuth';
import { isAdmin } from '../middlewares/isAdmin';

export const adminRoutes = express.Router();

// categories
adminRoutes.post('/categories', isAuth, isAdmin, addCategory);
adminRoutes.put('/categories/:id', isAuth, isAdmin, editCategory);
adminRoutes.delete('/categories/:id', isAuth, isAdmin, deleteCategory);

// subCategories
adminRoutes.post('/subcategories', isAuth, isAdmin, addSubCategory);
adminRoutes.put('/subcategories/:id', isAuth, isAdmin, editSubCategory);
adminRoutes.delete('/subcategories/:id', isAuth, isAdmin, deleteSubCategory);

// products
adminRoutes.post('/products', isAuth, isAdmin, addProduct);
adminRoutes.put('/products/:id', isAuth, isAdmin, editProduct);
adminRoutes.delete('/products/:id', isAuth, isAdmin, deleteProduct);
