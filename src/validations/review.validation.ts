import Joi from 'joi';

export const reviewValidationSchema = Joi.object({
  productId: Joi.string().required(),
  rating: Joi.number().min(0).max(5).required(),
  review: Joi.string().min(5).required()
});
