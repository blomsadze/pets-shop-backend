import express from 'express';
import {
  getProducts,
  getProduct,
  newArrivals,
  getTopSellingProducts
} from '../controllers/product.controller';

export const productRoutes = express.Router();

productRoutes.get('/products', getProducts);
productRoutes.get('/products/new-arrivals', newArrivals);
productRoutes.get('/products/top-selling', getTopSellingProducts);
productRoutes.get('/products/:id', getProduct);
