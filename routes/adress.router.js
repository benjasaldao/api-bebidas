const express = require("express");
const passport = require("passport");

const AdressService = require("../services/adresses.service");
const validationHandler = require("../middlewares/validationHandler");
const { checkApiKey, checkRoles } = require("../middlewares/authHandler");
const {
  getAdressSchema,
  createAdressSchema,
  updateAdressSchema,
} = require("../utils/schemas/adress.schema");

const router = express.Router();
const service = new AdressService();

router.get(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("customer", "admin"),
  validationHandler(getAdressSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const adress = await service.findOne(id);
      res.json(adress);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("customer", "admin"),
  validationHandler(createAdressSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newAdress = await service.create(body);
      res.status(201).json(newAdress);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("customer", "admin"),
  validationHandler(getAdressSchema, "params"),
  validationHandler(updateAdressSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const updatedAdress = service.update(id, body);
      res.json(updatedAdress);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("customer", "admin"),
  validationHandler(getAdressSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedAdress = service.delete(id);
      res.json(deletedAdress);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;