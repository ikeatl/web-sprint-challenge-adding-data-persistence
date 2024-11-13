// build your `/api/projects` router here
const express = require("express");
const Project = require("../project/model");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { project_name } = req.body;

  if (!project_name) {
    return res.status(400).json({ message: "Project name is required" });
  }
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      ...project,
      project_completed: Boolean(project.project_completed),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    console.log("x".repeat(30));
    const projects = await Project.getAll();
    console.log("projects:", projects);
    res.status(200).json(
      projects.map((project) => ({
        ...project,
        project_completed: Boolean(project.project_completed),
      }))
    );
  } catch (error) {
    next(error);
  }
});
module.exports = router;
