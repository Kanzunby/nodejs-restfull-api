import Joi from "joi";

const createContactValidation = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(200).required(),
  phone: Joi.string().max(20).optional(),
});

const getContactValidation = Joi.string();

export { createContactValidation, getContactValidation };