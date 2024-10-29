import express from 'express';
import {
  addAccessory,
  addCategory,
  addToy,
  deleteAccessory,
  deleteCategory,
  deleteToy,
  editAccessory,
  editCategory,
  editToy
} from '../controllers/admin.controller';
import { isAuth } from '../middlewares/isAuth';
import { isAdmin } from '../middlewares/isAdmin';

export const adminRoutes = express.Router();

// categories
adminRoutes.post('/categories', isAuth, isAdmin, addCategory);
adminRoutes.put('/categories/:id', isAuth, isAdmin, editCategory);
adminRoutes.delete('/categories/:id', isAuth, isAdmin, deleteCategory);

// products
adminRoutes.post('/toys', isAuth, isAdmin, addToy);
adminRoutes.put('/toys/:id', isAuth, isAdmin, editToy);
adminRoutes.delete('/toys/:id', isAuth, isAdmin, deleteToy);
adminRoutes.post('/accessories', isAuth, isAdmin, addAccessory);
adminRoutes.put('/accessories/:id', isAuth, isAdmin, editAccessory);
adminRoutes.delete('/accessories/:id', isAuth, isAdmin, deleteAccessory);
