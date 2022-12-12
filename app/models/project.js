const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String },
  users: { type: [mongoose.Types.ObjectId], default: [] },
  owner: { type: mongoose.Types.ObjectId, required: true },
  tags: { type: [], default: [] },
});

const ProjectModel = mongoose.model("projects", ProjectSchema);

module.exports = {
  ProjectModel,
};
