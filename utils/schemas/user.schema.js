const Joi = require("joi");

const id = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
const phone = Joi.string().min(6);
const username = Joi.string().min(4);

const createUserSchema = Joi.object({
  name: username.required(),
  email: email.required(),
  password: password.required(),
  phone: phone.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  phone: phone,
  password: password,
  name: username,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
