const express = require("express");
const passport = require("passport");

const UserService = require("./../services/user.service.js");
const validationHandler = require("./../middlewares/validationHandler");
const { checkRoles, checkApiKey } = require("./../middlewares/authHandler");
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
 } = require("./../utils/schemas/user.schema");

const router = express.Router();
const service = new UserService();

router.get(
  "/",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const users = await service.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validationHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findById(id);
      res.json(user[0]);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  checkApiKey,
  validationHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/admin",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validationHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      body.role = "admin";
      console.log(body);
      const newUser = await service.create(body);
      res.status(201).json(newUser);
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
  validationHandler(getUserSchema, "params"),
  validationHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
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
  validationHandler(getUserSchema, "params"),
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
