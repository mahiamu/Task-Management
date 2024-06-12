const mongoose = require('mongoose');
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, minlength: 3, maxlength: 255 },
  description: { type: String, maxlength: 1024 },
  deadline: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
});

const Task = mongoose.model('Task', taskSchema);

const validateTask = (task) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().max(1024),
    deadline: Joi.date().required(),
    priority: Joi.string().valid('Low', 'Medium', 'High'),
    status: Joi.string().valid('Pending', 'Completed')
  });
  return schema.validate(task);
};

module.exports = { Task, validateTask };
