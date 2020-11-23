const apiRouter = require('express').Router();

apiRouter.use('/users', require('./users/usersRouter'));
apiRouter.use('/tasks', require('./tasks/tasksRouter'));

module.exports = apiRouter;
