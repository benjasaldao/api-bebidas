const Joi = require("joi");

const id = Joi.string();
const amount = Joi.number().min(0);
const state = Joi.bool();
const userId = Joi.string();
const items = Joi.array();

const createSaleSchema = Joi.object({
  amount: amount.required(),
  state: state.required(),
  userId: userId.required(),
  items: items.required(),
});

const updateSaleSchema = Joi.object({
  amount,
  state,
  userId,
  items,
});

const getSaleSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createSaleSchema,
  updateSaleSchema,
  getSaleSchema,
};
