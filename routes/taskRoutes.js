const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { validateTask, validateTaskUpdate } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(protect, getTasks)
  .post(protect, validateTask, createTask);
 
router.route('/:id')
  .get(protect, getTask)
  .put(protect, validateTaskUpdate, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
