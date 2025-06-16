import Joi from 'joi';

export const categoryValidationSchema = Joi.object({
  name_ka: Joi.string().required(),
  name_en: Joi.string().required()
});

export const subCategoryValidationSchema = Joi.object({
  name_ka: Joi.string().required(),
  name_en: Joi.string().required(),
  category_id: Joi.string().required()
});
