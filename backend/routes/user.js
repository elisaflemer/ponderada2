const express = require('express');
const userController = require('../controllers/user')
const userValidator = require('../middlewares/usersValidate')
const authenticate = require('../middlewares/auth')
const router = express.Router();

router.route('/').post(userValidator.create, userController.registerUser);

router.post('/login', userController.login);

router.get('/me', authenticate.protect, userController.getMe)

module.exports = router;