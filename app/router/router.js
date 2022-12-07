const { authRouter, authRoutes } = require("./auth");
const { projectRouter, projectRoutes } = require("./project");
const { teamRouter, teamRoutes } = require("./team");
const { userRouter, userRoutes } = require("./user");

const router = require("express").Router();

router.use("/project", projectRoutes);
router.use("/team", teamRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = {
  AllRoutes: router,
};
