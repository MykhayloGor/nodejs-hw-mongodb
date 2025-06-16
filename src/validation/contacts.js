import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().required(),
  isFavorite: Joi.boolean(),
  contactTyoe: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string(),
  email: Joi.string(),
  isFavorite: Joi.boolean(),
  contactTyoe: Joi.string().valid('work', 'home', 'personal'),
});
