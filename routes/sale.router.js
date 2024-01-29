const express = require("express");
const passport = require("passport");

const SaleService = require("../services/sale.service");
const validationHandler = require("../middlewares/validationHandler");
const { checkRoles, checkApiKey } = require("./../middlewares/authHandler");
const {
  createSaleSchema,
  updateSaleSchema,
  getSaleSchema,
} = require("../utils/schemas/sale.schema");

const router = express.Router();
const service = new SaleService();

router.get("/", checkApiKey, async (req, res, next) => {
  try {
    const sales = await service.findAll();
    res.json(sales);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  checkApiKey,
  validationHandler(getSaleSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const sale = await service.findOne(id);
      res.json(sale);
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
  validationHandler(createSaleSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newSale = await service.create(body);
      res.status(201).json(newSale);
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
  validationHandler(getSaleSchema, "params"),
  validationHandler(updateSaleSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const sale = await service.update(id, body);
      res.json(sale);
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
  validationHandler(getSaleSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const sale = service.delete(id);
      res.status(201).json(sale);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
