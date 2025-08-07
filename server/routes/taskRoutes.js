const express = require('express');
const router = express.Router();
const{
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// /api/tasks
router.route('/').get(getAllTasks).post(createTask);

// api/tasks/:id
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;
