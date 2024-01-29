const express = require("express");
const passport = require("passport");

const PurchaseService = require("../services/purchase.service");
const validationHandler = require("../middlewares/validationHandler");
const { checkRoles, checkApiKey } = require("./../middlewares/authHandler");
const {
  createPurchaseSchema,
  updatePurchaseSchema,
  getPurchaseSchema,
} = require("../utils/schemas/purchase.schema");

const router = express.Router();
const service = new PurchaseService();

router.get("/", checkApiKey, async (req, res, next) => {
  try {
    const purchases = await service.findAll();
    res.json(purchases);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  checkApiKey,
  validationHandler(getPurchaseSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const purchase = await service.findOne(id);
      res.json(purchase);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validationHandler(createPurchaseSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newpurchase = await service.create(body);
      res.status(201).json(newpurchase);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validationHandler(getPurchaseSchema, "params"),
  validationHandler(updatePurchaseSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const purchase = await service.update(id, body);
      res.json(purchase);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validationHandler(getPurchaseSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const purchase = await service.delete(id);
      res.status(201).json(purchase);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
