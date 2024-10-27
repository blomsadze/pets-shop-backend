import Joi from 'joi';

export const toyValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required()
  // image: Joi.required()
});
