const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const hashString = (str) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
};

const tokenGenerator = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "3 days",
  });
  return token;
};

const verifyJwtToken = (token) => {
  const result = jwt.verify(token, process.env.SECRET_KEY);
  if (!result?.username)
    throw {
      status: 401,
      success: false,
      message: "لطفا وارد حساب کاربری خود شوید",
    };
  return result;
};

const createPathDirectory = () => {
  let d = new Date();
  const Year = ""+d.getFullYear();
  const Day = ""+d.getDate();
  const Month = ""+d.getMonth();

  const uploadPath = path.join(__dirname,"..","..","public","uploads",Year,Month,Day)

  fs.mkdirSync(uploadPath,{recursive:true})
  return uploadPath
};

module.exports = { hashString, tokenGenerator, verifyJwtToken,createPathDirectory };
