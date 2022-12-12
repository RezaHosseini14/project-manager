const { UserModel } = require("../../models/user");
const { verifyJwtToken } = require("../../modules/function");

const checkLogin = async (req, res, next) => {
  try {
    let loginError = {
      status: 401,
      success: false,
      message: "لطفا وارد حساب کاربری خود شوید",
    };
    const authorization = req?.headers?.authorization;
    console.log(authorization);
    if (!authorization) throw loginError;

    let token = authorization.split(" ")?.[1];
    if (!token) throw loginError;
    const result = verifyJwtToken(token);
    const { username } = result;
    console.log(result);
    const user = await UserModel.findOne({ username }, { password: 0 });
    if (!user) throw loginError;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkLogin };
