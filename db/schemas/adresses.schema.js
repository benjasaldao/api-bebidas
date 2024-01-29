const { Schema } = require("mongoose");

const adressesSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  floor: Number,
  apartment: String,
  neighborhood: String,
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = adressesSchema;
