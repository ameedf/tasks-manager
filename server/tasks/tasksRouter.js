const router = require('express').Router();
const tasksRepository = require('../tasks/tasksRepository');
const authentication = require('../security/authentication');
const remove = require('../utils/propertiesRemover');
const usersRepository = require('../users/usersRepository');
const roles = require('../security/roles');
const wsHandler = require('../utils/webSockets');

router.get('/', (req, res) => {
	if (authentication.isAuthorized(req, res, roles.ALL)) {
		const user = req.session.user;
		if (user.role === 'DEVELOPER') {
			res.send(
				tasksRepository
				.findByUserId(user.id)
				.map(task => remove(task, ["userId"])));
		} else {
			res.send(
				tasksRepository
				.findAll()
				.map(task => fillUserNameForTask(task))
				.map(task => remove(task, ["userId"])));
		}
	}
});

const fillUserNameForTask = task => {
	const taskUser = usersRepository.findById(task.userId);
	return {...task, userName: taskUser.name}
}

router.post('/', (req, res) => {
	if (authentication.isAuthorized(req, res, roles.TEAM_LEADER)) {
		try {
			const task = tasksRepository.insert(req.body.newTask);
			res.send(fillUserNameForTask(task));
			notifyUser(task);
		} catch (err) {
			res.status(401).send(err)
		}
	}
})

const notifyUser = task => {
	try {
		wsHandler.io()
				 .to("" + task.userId)
				 .emit("tasks/add", JSON.stringify(task));
	} catch (err) {
		console.log(err);
	}
}
module.exports = router;
