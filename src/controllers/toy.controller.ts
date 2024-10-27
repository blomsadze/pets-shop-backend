import { NextFunction, Request, Response } from 'express';

import Toy from '../models/toy.model';

// utils
import { asyncHandler } from '../utils/asyncHandler.util';
import { successHandler } from '../utils/successHadler.util';
import { errorHandler } from '../utils/errorHandler.util';

export const getToys = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const toys = await Toy.find();
    return successHandler(res, toys);
  }
);

export const getToy = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const toy = await Toy.findById(id);

    if (!toy) return errorHandler(res, 'Toy with given id not found', 404);

    return successHandler(res, toy);
  }
);
