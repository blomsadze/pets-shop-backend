import { NextFunction, Request, Response } from 'express';

import Accessory from '../models/accessory.model';

// utils
import { asyncHandler } from '../utils/asyncHandler.util';
import { successHandler } from '../utils/successHadler.util';
import { errorHandler } from '../utils/errorHandler.util';

export const getAccessories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessories = await Accessory.find();
    return successHandler(res, accessories);
  }
);

export const getAccessory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const accessory = await Accessory.findById(id);

    if (!accessory)
      return errorHandler(res, 'Accessory with given id not found', 404);

    return successHandler(res, accessory);
  }
);
