const { body } = require("express-validator");
const { UserModel } = require("../../models/user");

function registerValidator() {
  return [
    body("username").custom(async (value, ctx) => {
      if (value) {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
        if (usernameRegex.test(value)) {
          const user = await UserModel.findOne({ username: value });
          if (user) throw "نام کاربری موجود می باشد";
          return true;
        }
        throw "نام کاربری نادرست می باشد";
      } else {
        throw "نام کاربری نمی تواند خالی باشد";
      }
    }),
    body("email")
      .isEmail()
      .withMessage("ایمیل وارد شده صحیح نمی باشد")
      .custom(async (email) => {
        const user = await UserModel.findOne({ email });
        if (user) throw "ایمیل موجود می باشد";
      }),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("شماره موبایل وارد شده صحیح نمی باشد")
      .custom(async (mobile) => {
        const user = await UserModel.findOne({ mobile });
        if (user) throw "موبایل موجود می باشد";
      }),

    body("password").custom((value, ctx) => {
      if (!value) throw "رمزعبور نمی تواند خالی باشد";
      if (value !== ctx?.req?.body?.confirm_password)
        throw "رمز عبور با تکرار آن یکسان نمی باشد";
      return true;
    }),
  ];
}

function loginValidator() {
  return [
    body("username")
      .notEmpty()
      .withMessage("نام کاربری نمی تواند خالی باشد")
      .custom((username) => {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
        if (usernameRegex.test(username)) {
          return true;
        }
        throw "نام کاربری نادرست می باشد";
      }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("رمز عبور حداقل 6 و حداکثر 16 نویسه می باشد"),
  ];
}

module.exports = {
  registerValidator,
  loginValidator,
};
