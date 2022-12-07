const { UserModel } = require("../../models/user");
const { hashString } = require("../../modules/function");

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
  login() {}
  resetPassword() {}
}
module.exports = {
  AuthController: new AuthController(),
};
