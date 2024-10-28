import express from 'express';
import {
  getAccessories,
  getAccessory
} from '../controllers/accessory.controller';

export const accessoryRoutes = express.Router();

accessoryRoutes.get('/accessories', getAccessories);
accessoryRoutes.get('/accessories/:id', getAccessory);
