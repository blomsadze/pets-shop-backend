import express from 'express';
import {
  getProducts,
  getProduct,
  newArrivals,
  getTopSellingProducts,
  getSimilarProducts
} from '../controllers/product.controller';
import { cacheMiddleware } from '../middlewares/cache';

export const productRoutes = express.Router();

// ✅ Apply caching middleware dynamically
productRoutes.get('/products', cacheMiddleware('products'), getProducts); // Cache for 5 mins
productRoutes.get(
  '/products/new-arrivals',
  cacheMiddleware('new-arrivals'),
  newArrivals
); // Cache for 3 mins
productRoutes.get(
  '/products/top-selling',
  cacheMiddleware('top-selling'),
  getTopSellingProducts
); // Cache for 10 mins
productRoutes.get('/products/:id', cacheMiddleware('product'), getProduct); // Cache for 2 mins
productRoutes.get(
  '/products/similar-products/:id',
  cacheMiddleware('similar-products'),
  getSimilarProducts
); // Cache for 2 mins
