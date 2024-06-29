import Joi from "joi";

const createContactValidation = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(200).required(),
  phone: Joi.string().max(20).optional(),
});

const getContactValidation = Joi.string();

const updateContactValidation = Joi.object({
  id: Joi.string(),
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(200).required(),
  phone: Joi.string().max(20).optional(),
});

const searchContactValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});

export {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
  searchContactValidation,
};
