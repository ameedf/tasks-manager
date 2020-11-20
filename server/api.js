const apiRouter = require('express').Router();

const initialize = app => {
	apiRouter.use('/users', require('./users/usersRouter'));
	apiRouter.use('/tasks', require('./tasks/tasksRouter'));

	app.use('/api', apiRouter)
}

module.exports = {initialize};
