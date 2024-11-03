import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import {
  deleteCart,
  getCart,
  getOrders,
  postCart,
  postMultipleCart,
  postOrder,
  reduceQuantityInCart
} from '../controllers/cart.controller.js';

export const cartRoutes = express.Router();

// cart
cartRoutes.get('/cart', isAuth, getCart);
cartRoutes.post('/cart', isAuth, postCart);
cartRoutes.post('/cart/multiple', isAuth, postMultipleCart);
cartRoutes.delete('/cart', isAuth, deleteCart);
cartRoutes.delete('/cart/reduce-quantity', isAuth, reduceQuantityInCart);

// order
cartRoutes.post('/create-order', isAuth, postOrder);
cartRoutes.get('/orders', isAuth, getOrders);
