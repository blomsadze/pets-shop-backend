import express from 'express';
import {
  addAccessory,
  addToy,
  deleteAccessory,
  deleteToy,
  editAccessory,
  editToy
} from '../controllers/admin.controller';
import { isAuth } from '../middlewares/isAuth';
import { isAdmin } from '../middlewares/isAdmin';

export const adminRoutes = express.Router();

adminRoutes.post('/toys', isAuth, isAdmin, addToy);
adminRoutes.put('/toys/:id', isAuth, isAdmin, editToy);
adminRoutes.delete('/toys/:id', isAuth, isAdmin, deleteToy);
adminRoutes.post('/accessories', isAuth, isAdmin, addAccessory);
adminRoutes.put('/accessories/:id', isAuth, isAdmin, editAccessory);
adminRoutes.delete('/accessories/:id', isAuth, isAdmin, deleteAccessory);
