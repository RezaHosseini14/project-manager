const { body } = require("express-validator");

function createProjectValidator() {
  return [
    body("title").notEmpty().withMessage("عنوان پروژه نمی تواند خالی باشد"),
    body("tags")
      .isLength({ min: 0, max: 10 })
      .withMessage("حداکثر 10 برچسب میتوانید استفاده کنید"),
    body("text")
      .isLength({ min: 20 })
      .withMessage(
        "توضیحات پروژه نمی تواند خالی باشد و حداقل باید 20 کاراکتر باشد"
      ),
  ];
}

module.exports = { createProjectValidator };
