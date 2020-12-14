const taskValidator = require('./taskValidator');
const dbService = require('../utils/dbService');

class TasksRepository {

	findAll() {
		return dbService.executeQuery("SELECT * FROM tasks");
	}

	findByUserId(userId) {
		return dbService.executeQuery("SELECT * FROM tasks WHERE userId = ?", [userId]);
	}

	async insert(task) {
		const { userId, description, errors } = taskValidator.validate(task);
		if (errors) {
			throw { errors };
		}
		const createdAt = Date.now();
		const newTask = { description, userId, createdAt };
		const results = await dbService.executeQuery("INSERT INTO tasks SET ?", newTask);
		const newTaskId = results.insertId;
		return { id: newTaskId, ...newTask };
	}
}

const REPOSITORY = new TasksRepository();
module.exports = REPOSITORY;
