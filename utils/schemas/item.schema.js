const Joi = require("joi");
const { createProductSchema } = require("./product.schema");

const id = Joi.string();
const amount = Joi.number().min(0);
const movementId = Joi.string();
const productId = Joi.string();

const createItemSchema = Joi.object({
  amount: amount.required(),
  productId: productId.required(),
  product: createProductSchema,
});

const updateItemSchema = Joi.object({
  amount,
  productId,
  product: createProductSchema,
});

const getItemSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createItemSchema,
  updateItemSchema,
  getItemSchema,
};
