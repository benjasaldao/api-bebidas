const Joi = require("joi");

const id = Joi.string();
const amount = Joi.number().min(0);
const movementId = Joi.string();
const productId = Joi.string();

const createItemSchema = Joi.object({
  amount: amount.required(),
  productId: productId.required(),
});

const updateItemSchema = Joi.object({
  amount,
  productId,
});

const getItemSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createItemSchema,
  updateItemSchema,
  getItemSchema,
};
