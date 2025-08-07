const Task = require('../models/Task');


// @desc    Get all tasks
// @route   GET /api/tasks
exports.getAllTasks = async (req , res) => {
try{
    const tasks = await Task.find();
    res.status(200).json(tasks);
}catch(err){
    res.status(500).json({ message: err.message});
}
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) 
        return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const task = await Task.create({ title, description, deadline });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
    try{
        const update = req.body;
        const task = await Task.findByIdAndUpdate(req.aparams.id, updates, {new: true});
        if(!task) return res.status(404).json({message: 'Task not found'});
        res.status(200).json(task);
    }catch(err){
        res.status(400).json({ message: err.message});
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) 
            return res.status(404).json({ message: 'Task not found'});
        res.status(200).json({message: 'Task Deleted'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
};