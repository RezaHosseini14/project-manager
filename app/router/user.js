const { UserContr1oller } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { imageValidator } = require("../http/validations/user");
const { uploader_multer } = require("../modules/multer");

const router = require("express").Router();

router.get("/profile", checkLogin, UserContr1oller.getProfile);
router.post("/profile", checkLogin, UserContr1oller.editProfile);
router.post(
  "/profile_image",
  checkLogin,
  uploader_multer.single("image"),
  imageValidator(),
  expressValidatorMapper,
  UserContr1oller.uploadProfileImage
);

module.exports = {
  userRoutes: router,
};
