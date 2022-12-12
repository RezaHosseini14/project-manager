const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { createProjectValidator } = require("../http/validations/project");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");

const router = require("express").Router();

router.post(
  "/create",
  checkLogin,
  createProjectValidator(),
  expressValidatorMapper,
  ProjectController.createProject
);

module.exports = {
  projectRoutes: router,
};
