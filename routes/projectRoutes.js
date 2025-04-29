// routes/projectRoutes.js
const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { validateProject } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// Include task routes
const taskRouter = require('./taskRoutes');

const router = express.Router();

// Re-route into other resource routers
router.use('/:projectId/tasks', taskRouter);

router.route('/')
  .get(protect, getProjects)
  .post(protect, validateProject, createProject);

router.route('/:id')
  .get(protect, getProject)
  .put(protect, validateProject, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
