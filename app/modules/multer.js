const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { createPathDirectory } = require("./function");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, createPathDirectory());
  },
  filename: (req, file, cb) => {
    const type = path.extname(file?.originalname);
    cb(null, Date.now() + type);
  },
});

const uploader_multer = multer({ storage });

module.exports = { uploader_multer };
