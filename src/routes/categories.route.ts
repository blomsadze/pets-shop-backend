import express from 'express';
import { getCategories } from '../controllers/category.controller';

export const categoryRoutes = express.Router();

categoryRoutes.get('/categories', getCategories);
