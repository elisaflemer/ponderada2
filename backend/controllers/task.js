const { validationResult } = require('express-validator');
const taskServices = require('../services/task');

// @desc Get tasks
// @route GET /api/tasks
// @access Private
const getTasks = async (req, res) => {
    const tasks = await taskServices.getTasks(req.user_id);
    return res.status(200).json({ tasks });
}

// @desc Create tasks
// @route POST /api/tasks
// @access Private
const createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const task = {
        text: req.body.text,
        user: req.user_id,
        completed: req.body.completed || false // Add completed field
    }
    const createdTask = await taskServices.createTask(task);
    return res.status(201).json({ task: createdTask });
}

const updateTask = async (req, res) => {
    console.log(req.body)
    const taskToUpdate = {
        text: req.body.text,
        completed: req.body.completed || false // Add completed field
    };
    console.log(taskToUpdate)
    const updatedTask = await taskServices.updateTask(req.params.id, taskToUpdate);
    return res.status(200).json({ task: updatedTask });
}

const deleteTask = async (req, res) => {
    const deletedTask = await taskServices.deleteTask(req.params.id);
    return res.status(204).json({ task: deletedTask });
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
