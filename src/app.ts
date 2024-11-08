import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

// Routes
import { authRoutes } from './routes/auth.route';
import { adminRoutes } from './routes/admin.route';
import { productRoutes } from './routes/product.route';
import { cartRoutes } from './routes/cart.route';
import { categoryRoutes } from './routes/category.route';

import { globalErrorHandler } from './utils/errorHandler.util.js';
import { get404 } from './controllers/error.controller';
import { reviewRoutes } from './routes/review.route';

dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@pets.nzmgh.mongodb.net/shop`;

const app = express();

app.use(express.json());

// middlewares
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies, etc.)
  next();
});

const storage = multer.memoryStorage();
app.use(
  multer({
    storage: storage
  }).single('image')
);

// Set a timeout of 30 seconds
app.use((req, res, next) => {
  res.setTimeout(30000, () => {
    console.log('Request has timed out.');
    res.status(408).send('Request timed out.');
  });
  next();
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(reviewRoutes);

app.use(helmet());
app.use(compression());

app.use(get404);

// @ts-expect-error err
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  return globalErrorHandler(error, req, res);
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`Connected to port ${process.env.PORT}`);
  })
  .catch((error) => {
    console.log(error);
  });
