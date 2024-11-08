import express from 'express';
import {
  addReview,
  getProductReviews,
  getTopRatedProducts
} from '../controllers/review.controller';
import { isAuth } from '../middlewares/isAuth';

export const reviewRoutes = express.Router();

reviewRoutes.post('/reviews', isAuth, addReview);
reviewRoutes.get('/reviews/top-rated', getTopRatedProducts);
reviewRoutes.get('/reviews/:productId', getProductReviews);
