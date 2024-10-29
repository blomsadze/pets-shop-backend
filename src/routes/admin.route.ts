import express from 'express';

import {
  addCategory,
  addProduct,
  editCategory,
  editProduct,
  deleteCategory,
  deleteProduct
} from '../controllers/admin.controller';
import { isAuth } from '../middlewares/isAuth';
import { isAdmin } from '../middlewares/isAdmin';

export const adminRoutes = express.Router();

// categories
adminRoutes.post('/categories', isAuth, isAdmin, addCategory);
adminRoutes.put('/categories/:id', isAuth, isAdmin, editCategory);
adminRoutes.delete('/categories/:id', isAuth, isAdmin, deleteCategory);

// products
adminRoutes.post('/products', isAuth, isAdmin, addProduct);
adminRoutes.put('/products/:id', isAuth, isAdmin, editProduct);
adminRoutes.delete('/products/:id', isAuth, isAdmin, deleteProduct);
