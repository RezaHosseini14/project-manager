const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  users: { type: [mongoose.Types.ObjectId], default: [] },
  owner: { type: mongoose.Types.ObjectId, required: true },
});

const ProjectModel = mongoose.model("team", ProjectSchema);

module.exports = {
  ProjectModel,
};
