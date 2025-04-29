// models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a project name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

// Cascade delete tasks when a project is deleted
ProjectSchema.pre('remove', async function (next) {
  try {
    await this.model('Task').deleteMany({ project: this._id });
    next();
  } catch (err) {
    console.error('🔥 Error in project pre-remove hook:', err);
    next(err);
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
