// build your `/api/tasks` router here
const express = require("express");
const Task = require("../task/model");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      ...task,
      task_completed: Boolean(task.task_completed),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const task = await Task.getAllWithProjectDetails();
    res.status(200).json(
      task.map((task) => ({
        ...task,
        task_completed: Boolean(task.task_completed),
      }))
    );
  } catch (error) {
    next(error);
  }
});
module.exports = router;
