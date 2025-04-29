// controllers/projectController.js
const Project = require('../models/Project');
const { ErrorResponse } = require('../utils/errorHandler');

// @desc    Get all projects for logged in user
// @route   GET /api/projects
// @access  Private
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(new ErrorResponse(`Project not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns project
    if (project.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User not authorized to access this project`, 401));
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Check for existing projects
    const projectCount = await Project.countDocuments({ user: req.user.id });

    // If the user has already 4 projects
    if (projectCount >= 4) {
      return next(new ErrorResponse(`User can only have up to 4 projects`, 400));
    }

    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
 
    if (!project) {
      return next(new ErrorResponse(`Project not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns project
    if (project.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User not authorized to update this project`, 401));
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};


// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(new ErrorResponse(`Project not found with id of ${req.params.id}`, 404));
    }

    // Check if user owns the project
    if (project.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User not authorized to delete this project`, 401));
    }

    try {
      // Option 1: Use deleteOne() directly on the model
      await Project.deleteOne({ _id: req.params.id });
      
      // Alternative Option 2: Use the model instance deleteOne method
      // await project.deleteOne();
    } catch (err) {
      console.error('🔥 Error deleting project:', err);
      return next(new ErrorResponse('Failed to delete project', 500));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err); // Any other errors (like finding the project)
  }
};