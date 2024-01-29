const Joi = require("joi");

const id = Joi.string();
const amount = Joi.number().min(0);
const state = Joi.bool();
const items = Joi.array();

const createPurchaseSchema = Joi.object({
  amount: amount.required(),
  state: state.required(),
  items: items.required(),
});

const updatePurchaseSchema = Joi.object({
  amount,
  state,
  items,
});

const getPurchaseSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPurchaseSchema,
  updatePurchaseSchema,
  getPurchaseSchema,
};
