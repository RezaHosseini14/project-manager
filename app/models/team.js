const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String },
  image: { type: String, default: "./" },
  owner: { type: mongoose.Types.ObjectId, required: true },
  team: { type: mongoose.Types.ObjectId },
  private: { type: boolean, default: true },
});

const TeamModel = mongoose.model("team", TeamSchema);

module.exports = {
  TeamModel,
};
