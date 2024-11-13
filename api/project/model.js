// build your `Project` model here
const db = require("../../data/dbConfig");

function getAll() {
  return db("projects");
}

function create(resource) {
  return db("projects")
    .insert(resource)
    .then(([id]) => db("projects").where({ project_id: id }).first());
}

module.exports = {
  getAll,
  create,
};
