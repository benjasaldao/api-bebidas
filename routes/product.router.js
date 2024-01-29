const express = require("express");
const passport = require("passport");

const ProductsService = require("../services/product.service");
const validationHandler = require("../middlewares/validationHandler");
const { checkRoles, checkApiKey } = require("./../middlewares/authHandler");
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require("../utils/schemas/product.schema");

const router = express.Router();
const service = new ProductsService();

router.get(
  "/",
  checkApiKey,
  validationHandler(queryProductSchema, "query"),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id",
  checkApiKey,
  validationHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validationHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const newProduct = await service.create(req);
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  validationHandler(getProductSchema, "params"),
  validationHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.update(id, req);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  validationHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;