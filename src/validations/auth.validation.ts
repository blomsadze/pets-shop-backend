import Joi from 'joi';

export const signUpSchema = Joi.object({
  first_name_ka: Joi.string().required(),
  first_name_en: Joi.string().required(),
  last_name_ka: Joi.string().required(),
  last_name_en: Joi.string().required(),
  gender: Joi.string().required(),
  birthday_year: Joi.number().required(),
  address_ka: Joi.string().required(),
  address_en: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
