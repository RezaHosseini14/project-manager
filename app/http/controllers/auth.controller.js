const { UserModel } = require("../../models/user");
const { hashString, tokenGenerator } = require("../../modules/function");
const bcrypt = require("bcrypt");

class AuthController {
  async register(req, res, next) {
    const { username, password, email, mobile } = req.body;
    const hash_password = hashString(password);
    const user = await UserModel.create({
      username,
      email,
      password: hash_password,
      mobile,
    });
    return res.json(user);
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user)
        throw {
          status: 401,
          success: false,
          messege: "نام کاربری یا رمز عبور اشتباه می باشد",
        };
      const compareResult = bcrypt.compareSync(password, user.password);
      if (!compareResult)
        throw {
          status: 401,
          success: false,
          messege: "نام کاربری یا رمز عبور اشتباه می باشد",
        };
      const token = tokenGenerator({ username });

      user.token = token;
      user.save();

      return res.status(201).json({
        status: 201,
        success: true,
        messege: "ورود با موفقیت انجام شد",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
  resetPassword() {}
}
module.exports = {
  AuthController: new AuthController(),
};
