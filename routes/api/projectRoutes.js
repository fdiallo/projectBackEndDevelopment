const express = require('express');
const router = express.Router();
const Project = require('../../models/Project.js');

const auth = require('../../utils/auth');

//router.use(auth);

// POST /api/projects: Create a new project
router.post('/api/projects', async (req, res) => {
  const project = new Project({ ...req.body, user: req.user.id });
  await project.save();
  res.status(201).json(project);
});

// GET /api/projects: Get all projects owned by the currently logged-in user
router.get('/api/projects', async (req, res) => {
  const projects = await Project.find({ user: req.user.id });
  res.json(projects);
});

// GET /api/projects/:id: Get a single project by its ID
router.get('/api/projects/:id', async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, user: req.user.id });
  if (!project) return res.status(404).send('Not Found');
  res.json(project);
});

// PUT /api/projects/:id
router.put('/api/projects/:id', async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!project) return res.status(404).send('Unauthorized or Not Found');
  res.json(project);
});

// DELETE /api/projects/:id
router.delete('/api/projects/:id', async (req, res) => {
  const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!project) return res.status(404).send('Unauthorized');
  res.json({ message: "Deleted" });
});

module.exports = router;
