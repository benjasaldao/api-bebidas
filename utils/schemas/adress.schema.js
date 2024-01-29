const Joi = require("joi");

const id = Joi.string();
const street = Joi.string().min(2);
const number = Joi.number().min(0);
const floor = Joi.number();
const apartment = Joi.string();
const neighborhood = Joi.string();
const userId = Joi.string();

const createAdressSchema = Joi.object({
    userId: userId.required(),
    street: street.required(),
    number: number.required(),
    floor,
    apartment,
    neighborhood,
});

const updateAdressSchema = Joi.object({
    street,
    number,
    floor,
    apartment,
    neighborhood,
});

const getAdressSchema = Joi.object({
    id: id.required(),
});

module.exports = {
    createAdressSchema,
    updateAdressSchema,
    getAdressSchema,
};
