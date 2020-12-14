const router = require('express').Router();
const tasksRepository = require('../tasks/tasksRepository');
const authentication = require('../security/authentication');
const remove = require('../utils/propertiesRemover');
const usersRepository = require('../users/usersRepository');
const roles = require('../security/roles');
const wsHandler = require('../utils/webSockets');

// GET /api/tasks
router.get('/', async (req, res) => {
	if (authentication.isAuthorized(req, res, roles.ALL)) {
		const user = req.session.user;
		if (user.role === 'DEVELOPER') {
			const userTasks = await tasksRepository.findByUserId(user.id);
			const convertedTasks = userTasks.map(task => remove(task, ["userId"]));
			res.send(convertedTasks);
		} else {
			// TL
			const tlTasks = await tasksRepository.findAll();
			const converteTlTasks = [];
			for (const task of tlTasks) {
				let convertedTask = await fillUserNameForTask(task);
				convertedTask = remove(task, ["userId"]);
				converteTlTasks.push(convertedTask);
			}
			res.send(converteTlTasks);
		}
	}
});

const fillUserNameForTask = async task => {
	const taskUser = await usersRepository.findById(task.userId);
	return { ...task, userName: taskUser.name }
}

router.post('/', async (req, res) => {
	if (authentication.isAuthorized(req, res, roles.TEAM_LEADER)) {
		try {
			const task = await tasksRepository.insert(req.body.newTask);
			res.send(await fillUserNameForTask(task));
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
