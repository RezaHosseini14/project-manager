const router = require("express").Router();
const { AuthController } = require("../http/controllers/auth.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { registerValidator } = require("../http/validations/auth");

router.post("/register", registerValidator(),expressValidatorMapper, AuthController.register);

module.exports = {
  authRoutes: router,
};
