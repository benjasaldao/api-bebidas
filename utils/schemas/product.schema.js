const Joi = require("joi");

const id = Joi.string();
const name = Joi.string().min(3).max(25);
const brand = Joi.string().min(2).max(25);
const description = Joi.string().min(10);
const category = Joi.string();
const imageUrl = Joi.string();
const imageId = Joi.string();
const price = Joi.number().min(0);
const stock = Joi.number().min(0);

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  brand: brand.required(),
  imageUrl: imageUrl,
  imageId: imageId,
  price: price.required(),
  stock: stock.required(),
  category: category.required(),
});

const updateProductSchema = Joi.object({
    name: name,
    description: description,
    brand: brand,
    imageUrl: imageUrl,
    imageId: imageId,
    price: price,
    stock: stock,
    category: category,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
