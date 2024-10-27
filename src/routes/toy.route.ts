import express from 'express';
import { getToy, getToys } from '../controllers/toy.controller';

export const toyRoutes = express.Router();

toyRoutes.get('/toys', getToys);
toyRoutes.get('/toys/:id', getToy);
