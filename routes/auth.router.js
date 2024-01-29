const express = require("express");
const passport = require("passport");

const AuthService = require("./../services/auth.service");
const { checkApiKey } = require("../middlewares/authHandler");

const router = express.Router();
const service = new AuthService();

router.post(
  "/login",
  checkApiKey,
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post("/recovery", checkApiKey, async (req, res, next) => {
  try {
    const { email, url } = req.body;
    const rta = await service.sendRecovery(email, url);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.post("/change-password", checkApiKey, async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await service.changePassword(token, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;