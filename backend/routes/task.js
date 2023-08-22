const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/task')
const tasksValidator = require('../middlewares/tasksValidate')
const authenticate = require('../middlewares/auth')

router.route('/')
            .get(authenticate.protect, tasksController.getTasks)
            .post(authenticate.protect, tasksValidator.create, tasksController.createTask);

router.route('/:id')
            .put(authenticate.protect, tasksController.updateTask)
            .delete(authenticate.protect, tasksController.deleteTask);

module.exports = router;