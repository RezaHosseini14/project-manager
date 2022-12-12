const autoBind = require("auto-bind");
const { json } = require("express");
const { ProjectModel } = require("../../models/project");

class ProjectController {
  constructor() {
    autoBind(this);
  }
  async createProject(req, res, next) {
    try {
      const { title, text, tags } = req.body;

      const owner = req.user._id;

      const result = await ProjectModel.create({ title, text, owner, tags });

      if (!result)
        throw { status: 400, success: false, message: "پروژه ساخته نشد" };

      return res.status(201).json({
        status: 201,
        success: true,
        message: "پروژه با موفقیت ساخته شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProject(req, res, next) {
    try {
      const projects = await ProjectModel.find({});
      return res.status(200).json({ status: 200, success: true, projects });
    } catch (error) {
      next(error);
    }
  }

  async findProject(projectID, owner) {
    const project = await ProjectModel.findOne({ owner, _id: projectID });
    if (!project)
      throw { status: 404, success: false, message: "پروژه ای یافت نشد" };

    return project;
  }

  async getProjectById(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      const project = await this.findProject(projectID, owner);
      return res.status(200).json({ status: 200, success: true, project });
    } catch (error) {
      next(error);
    }
  }

  async getProjectOfUser(req, res, next) {
    try {
      const owner = req.user._id;
      const projects = await ProjectModel.find({ owner });
      return (
        res.status(200),
        json({
          status: 200,
          success: true,
          projects,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  async removeProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      const project = await this.findProject(projectID, owner);

      const deleteProjectResult = await ProjectModel.deleteOne({
        _id: projectID,
      });

      if (deleteProjectResult.deletedCount == 0)
        throw { status: 400, success: false, message: "پروژه حذف نشد" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "پروژه با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }

  getAllProjectOfTeam() {}

  updateProject() {}
}

module.exports = {
  ProjectController: new ProjectController(),
};
