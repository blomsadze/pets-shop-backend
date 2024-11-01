import Joi from 'joi';

export const productValidationSchema = Joi.object({
  name_ka: Joi.string().required(),
  name_en: Joi.string().required(),
  description: Joi.string().required(),
  category_id: Joi.string().required(),
  price: Joi.number().required()
});
