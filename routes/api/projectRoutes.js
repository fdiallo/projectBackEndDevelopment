const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');

// Create Project
router.post('/', async (req, res) => {
  try {
    const project = new Project({ ...req.body, user: req.user.id });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get User's Projects
router.get('/', async (req, res) => {
  const projects = await Project.find({ user: req.user.id });
  res.json(projects);
});

// Get, Update, Delete with Ownership Check
router.route('/:id')
  .get(async (req, res) => {
    const project = await Project.findOne({ _id: req.params.id, user: req.user.id });
    project ? res.json(project) : res.status(404).json({ message: "Not found" });
  })
  .put(async (req, res) => {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    project ? res.json(project) : res.status(404).json({ message: "Update failed/Unauthorized" });
  })
  .delete(async (req, res) => {
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    project ? res.json({ message: "Deleted" }) : res.status(404).json({ message: "Delete failed/Unauthorized" });
  });

module.exports = router;
