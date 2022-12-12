const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { createProjectValidator } = require("../http/validations/project");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { mongoIDValidator } = require("../http/validations/public");

const router = require("express").Router();

router.post( "/create", checkLogin, createProjectValidator(), expressValidatorMapper, ProjectController.createProject);
router.get("/list", checkLogin, ProjectController.getAllProject)
router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.getProjectById)
router.delete("/remove/:id", checkLogin,mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject)


module.exports = {
  projectRoutes: router,
};
