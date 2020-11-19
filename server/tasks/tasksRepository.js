const fs = require('fs');
const path = require('path');
const taskValidator = require('./taskValidator');

class TasksRepository {
	constructor() {
		this.tasks = [
			{id: 1, description: "Task 1", userId: 1, createdAt: 1605729605980},
			{id: 2, description: "Task 2", userId: 2, createdAt: 1605729605980},
		];
		this.nextId = 1;
		this.fileName = path.join(__dirname, 'tasks.dat');
		this.initialize();
	}

	initialize() {
		fs.exists(this.fileName, exists => {
			if (exists) {
				this.fetchAll();
			} else {
				this.saveAllTasks();
			}
		})
	}

	fetchAll() {
		fs.readFile(this.fileName, 'utf8', (err, data) => {
			if (err) {
				this.tasks = [];
			} else {
				this.tasks = JSON.parse(data);
			}
			if (this.tasks.length > 0) {
				const ids = this.tasks.map(task => task.id);
				this.nextId = Math.max(...ids) + 1;
			} else {
				this.nextId = 1;
			}
		});
	}

	findAll() {
		return this.tasks;
	}

	findByUserId(userId) {
		return this.tasks.filter(task => task.userId === userId);
	}

	findBy(predicate, predicateParam) {
		if (!predicateParam) {
			return null;
		}
		const index = this.tasks.findIndex(predicate);
		return index < 0 ? null : this.tasks[index];
	}

	insert(task) {
		const {userId, description, errors} = taskValidator.validate(task);
		if (errors) {
			throw {errors};
		}
		const createdAt = Date.now();
		const newTask = {id: this.nextId++, description, userId, createdAt};
		this.tasks.push(newTask);
		this.saveAllTasks();
		return newTask;
	}

	saveAllTasks() {
		fs.writeFile(this.fileName, JSON.stringify(this.tasks), 'utf8', (err) => {
			if (err) {
				console.log(err);
				throw {errors: ["A general failure occurred"]};
			}
		});
	}
}

const REPOSITORY = new TasksRepository();
module.exports = {
	findAll: () => REPOSITORY.findAll(),
	findByUserId: (userId) => REPOSITORY.findByUserId(userId),
	insert: (task) => REPOSITORY.insert(task),
}
