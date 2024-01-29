const Joi = require("joi");

const id = Joi.string();
const name = Joi.string().min(3).max(20);
const imageUrl = Joi.string().uri();
const imageId = Joi.string();

const createCategorySchema = Joi.object({
  name: name.required(),
  imageUrl: imageUrl.required(),
  imageId: imageId,
});

const updateCategorySchema = Joi.object({
  name: name,
  imageUrl: imageUrl,
  imageId: imageId,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
