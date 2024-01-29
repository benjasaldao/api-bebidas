const mongoose = require("mongoose");

const userSchema = require("./schemas/user.schema");
const saleSchema = require("./schemas/sale.schema");
const purchaseSchema = require("./schemas/purchase.schema");
const productSchema = require("./schemas/product.schema");
const categorySchema = require("./schemas/category.schema");
const adressesSchema = require("./schemas/adresses.schema");

const userModel = mongoose.model("User", userSchema);
const saleModel = mongoose.model("Sale", saleSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);
const productModel = mongoose.model("Product", productSchema);
const categoryModel = mongoose.model("Category", categorySchema);
const adressesModel = mongoose.model("Adresses", adressesSchema);

module.exports = {
  userModel,
  saleModel,
  purchaseModel,
  productModel,
  categoryModel,
  adressesModel,
};
