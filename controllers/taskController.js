// controllers/taskController.js
const Task = require('../models/Task');
const Project = require('../models/Project');
const { ErrorResponse } = require('../utils/errorHandler');

// @desc    Get all tasks for a project
// @route   GET /api/projects/:projectId/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return next(new ErrorResponse(`Project not found with id of ${req.params.projectId}`, 404));
    }

    // Make sure user owns project
    if (project.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User not authorized to access this project's tasks`, 401));
    }

    const tasks = await Task.find({ project: req.params.projectId });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate({
      path: 'project',
      select: 'name description'
    });

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User not authorized to access this task`, 401));
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new task
// @route   POST /api/projects/:projectId/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
  try {
    req.body.project = req.params.projectId;
    req.body.user = req.user.id;

    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return next(new ErrorResponse(`Project not found with id of ${req.params.projectId}`, 404));
    }

    // Make sure user owns project
    if (project.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User not authorized to add a task to this project`, 401));
    }

    const task = await Task.create(req.body);

    // If status is completed, set completedAt
    if (task.status === 'Completed') {
      task.completedAt = Date.now();
      await task.save();
    }

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User not authorized to update this task`, 401));
    }

    // Set completedAt date if status is changed to 'Completed'
    if (req.body.status === 'Completed' && task.status !== 'Completed') {
      req.body.completedAt = Date.now();
    }

    // If status is changed from 'Completed' to something else, reset completedAt
    if (task.status === 'Completed' && req.body.status && req.body.status !== 'Completed') {
      req.body.completedAt = null;
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns task 
    if (task.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User not authorized to delete this task`, 401));
    }

    await Task.findByIdAndDelete(req.params.id); 


    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};