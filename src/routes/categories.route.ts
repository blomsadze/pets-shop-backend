import express from 'express';
import { getCategories, getCategory } from '../controllers/category.controller';

export const categoryRoutes = express.Router();

categoryRoutes.get('/categories', getCategories);
categoryRoutes.get('/categories/:id', getCategory);
