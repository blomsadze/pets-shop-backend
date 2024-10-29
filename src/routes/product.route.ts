import express from 'express';
import { getProducts, getProduct } from '../controllers/product.controller';

export const productRoutes = express.Router();

productRoutes.get('/products', getProducts);
productRoutes.get('/products/:id', getProduct);
