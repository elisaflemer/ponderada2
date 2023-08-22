const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler')
const usersRouter = require('./routes/user')
const tasksRouter = require('./routes/task')
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/users', usersRouter)
app.use('/api/tasks', tasksRouter)
app.use(errorHandler.errorHandler)

module.exports = app;