const { UserModel } = require("../../models/user");

class UserContr1oller {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      user.profile_image = req.protocol + "://" + req.get("host")+ "/" + user.profile_image.replace(/[\\\\]/gm,"/");
      return res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      let data = req.body;
      const userID = req.user._id;
      let fields = ["first_name", "last_name", "skills"];
      let badValues = ["", " ", undefined, NaN, null, 0, -1];

      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
      });
      console.log(data);
      const result = await UserModel.updateOne({ _id: userID }, { $set: data });
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "کاربر با موفقیت بروزرسانی شد",
        });
      }
      throw { status: 401, success: false, message: "بروزرسانی انجام نشد" };
    } catch (error) {
      next(error);
    }
  }

  async uploadProfileImage(req, res, next) {
    try {
      const userID = req.user._id;

      if (Object.keys(req.file).length == 0)
        throw {
          status: 400,
          success: false,
          message: "لطفا موردی را انتخاب کنید",
        };

      const filePath = req.file.path.substring(29);

      const result = await UserModel.updateOne(
        { _id: userID },
        { $set: { profile_image: filePath } }
      );

      if (result.modifiedCount == 0)
        throw { status: 400, success: false, message: "بروزرسانی انجام نشد" };

      return res
        .status(200)
        .json({
          status: 200,
          success: true,
          message: "بروزرسانی با موفقیت انجام شد",
        });
    } catch (error) {
      next(error);
    }
  }
  addSkills() {}
  editSkills() {}
  acceptInviteInTeam() {}
  rejectInviteInTeam() {}
}

module.exports = {
  UserContr1oller: new UserContr1oller(),
};
