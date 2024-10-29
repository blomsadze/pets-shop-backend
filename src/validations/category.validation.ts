import Joi from 'joi';

export const categoryValidationSchema = Joi.object({
  name_ka: Joi.string().required(),
  name_en: Joi.string().required()
});
