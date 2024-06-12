const router = require('express').Router();
const { Task, validateTask } = require('../models/task');
const { protect } = require('../middleware/auth');

// Create a new task
router.post('/', protect, async (req, res) => {
  try {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const task = new Task({ ...req.body, user: req.user._id });
    await task.save();
    res.status(201).send({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Get all tasks for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Update a task by ID
router.put('/:id', protect, async (req, res) => {
  try {
    // Validation for update
    const updateSchema = Joi.object({
      status: Joi.string().valid('Pending', 'Completed').required(),
    });
    const { error } = updateSchema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send({ message: 'Task not found' });

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: 'Unauthorized' });
    }

    // Update the task
    task.status = req.body.status;
    await task.save();

    res.status(200).send({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Delete a task by ID
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send({ message: 'Task not found' });

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: 'Unauthorized' });
    }

    await task.remove();
    res.status(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
