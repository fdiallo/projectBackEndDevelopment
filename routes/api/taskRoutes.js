
const express = require('express');
const router = express.Router({ mergeParams: true }); // Important for :projectId
const Task = require('../../models/Task');
const Project = require('../../models/Project');
const auth = require('../../utils/auth');

//router.use(auth);

// Helper to verify project ownership
const verifyOwnership = async (req, res, next) => {
  const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });
  if (!project) return res.status(403).json({ error: "Access denied to project" });
  next();
};

// POST /api/projects/:projectId/tasks: Create a new task for a specific project
router.post('/api/projects/:projectId/tasks', verifyOwnership, async (req, res) => {
  const task = new Task({ ...req.body, project: req.params.projectId });
  await task.save();
  res.status(201).json(task);
});

// GET /api/projects/:projectId/tasks: Get all tasks for a specific project
router.get('/api/projects/:projectId/tasks', verifyOwnership, async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
});

// PUT /api/tasks/:taskId: Update a single task
router.put('/api/tasks/:taskId', verifyOwnership, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.taskId, project: req.params.projectId },
    req.body,
    { new: true }
  );
  res.json(task);
});

// DELETE /api/tasks/:taskId: Delete a single task
router.delete('/api/tasks/:taskId', verifyOwnership, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.taskId, project: req.params.projectId });
  res.json({ message: "Task deleted" });
});

module.exports = router;




// const express = require('express');
// const router = express.Router({ mergeParams: true });
// const Task = require('../models/Task');
// const Project = require('../models/Project');
// const auth = require('../../utils/auth');

// router.use(auth);

// // POST /api/projects/:projectId/tasks
// router.post('/', async (req, res) => {
//   const project = await Project.findOne({ _id: req.params.projectId, user: req.user._id });
//   if (!project) return res.status(403).send({ error: "Access Denied" });

//   const task = new Task({ ...req.body, project: req.params.projectId });
//   await task.save();
//   res.status(201).send(task);
// });

// // GET /api/projects/:projectId/tasks
// router.get('/', async (req, res) => {
//   const project = await Project.findOne({ _id: req.params.projectId, user: req.user._id });
//   if (!project) return res.status(403).send({ error: "Access Denied" });

//   const tasks = await Task.find({ project: req.params.projectId });
//   res.send(tasks);
// });

// router.put('/:taskId', auth, async (req, res) => {
//   try {
//     // 1. Find Task and 2. Populate parent project
//     const task = await Task.findById(req.params.taskId).populate('project');
    
//     if (!task) return res.status(404).send("Task not found");

//     // 3. Verify user owns the project associated with this task
//     if (task.project.user.toString() !== req.user.id) {
//       return res.status(403).send("Unauthorized: You do not own this project");
//     }

//     Object.assign(task, req.body);
//     await task.save();
//     res.json(task);
//   } catch (err) { res.status(500).json(err); }
// });



// router.delete('/:taskId', auth, async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.taskId).populate('project');
//     if (!task) return res.status(404).json({ error: "Task not found" });

//     // Check if the current user owns the project associated with this task
//     if (task.project.user.toString() !== req.user.id) {
//       return res.status(403).json({ error: "User does not own this project" });
//     }

//     await task.deleteOne();
//     res.json({ message: "Task deleted successfully" });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// module.exports = router;

