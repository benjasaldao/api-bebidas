const express = require("express");
const passport = require("passport");

const CategoryService = require("./../services/category.service");
const validatorHandler = require("./../middlewares/validationHandler");
const { checkRoles, checkApiKey } = require("../middlewares/authHandler");
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require("./../utils/schemas/category.schema");

const router = express.Router();
const service = new CategoryService();

router.get(
  "/",
  checkApiKey,
  async (req, res, next) => {
    try {
      const categories = await service.findAll();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  checkApiKey,
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category[0]);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const newCategory = await service.create(req);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
