// build your `Task` model here
const db = require("../../data/dbConfig");

function getAllWithProjectDetails() {
  return db("tasks")
    .join("projects", "tasks.project_id", "projects.project_id")
    .select("tasks.task_id", "tasks.task_description", "tasks.task_notes", "tasks.task_completed", "projects.project_name", "projects.project_description");
}
async function create(task) {
  const res = await db("tasks").insert(task).returning("*");
  return res[0];
}
module.exports = { getAllWithProjectDetails, create };
