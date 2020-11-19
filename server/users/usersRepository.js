const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const validator = require('./userValidator');

class UsersRepository {
	constructor() {
		this.users = [];
		this.nextId = 1;
		this.fileName = path.join(__dirname, 'users.dat');
		this.initialize();
	}

	initialize() {
		fs.exists(this.fileName, exists => {
			if (exists) {
				this.fetchAll();
			} else {
				this.saveAllUsers();
			}
		})
	}

	fetchAll() {
		fs.readFile(this.fileName, 'utf8', (err, data) => {
			if (err) {
				this.users = [];
			} else {
				this.users = JSON.parse(data);
			}
			if (this.users.length > 0) {
				const ids = this.users.map(u => u.id);
				this.nextId = Math.max(...ids) + 1;
			} else {
				this.nextId = 1;
			}
		});
	}

	findAll() {
		return this.users;
	}

	findAllByRole(role) {
		if (!role) {
			return [];
		}
		return this.users.filter(user => user.role === role);
	}
	findByName(userName) {
		if (!userName) {
			return null;
		}
		userName = userName.trim().toLowerCase();
		return this.findBy(user => user.name === userName, userName);
	}

	findById(userId) {
		if (!userId) {
			return null;
		}
		return this.findBy(user => user.id === userId, userId);
	}

	findBy(predicate, predicateParam) {
		if (!predicateParam) {
			return null;
		}
		const index = this.users.findIndex(predicate);
		return index < 0 ? null : this.users[index];
	}

	async insert(newUserData) {
		const {userName, password, role, errors} = validator.validate(newUserData);
		if (errors) {
			throw {errors};
		}
		if (this.findByName(userName)) {
			throw {errors: ["User already exists"]};
		}
		const hash = await bcrypt.hash(password, 10);
		const createdAt = Date.now();
		const newUser = {id: this.nextId++, name: userName, password: hash, role, createdAt};
		this.users.push(newUser);
		this.saveAllUsers();
		return newUser;
	}

	saveAllUsers() {
		fs.writeFile(this.fileName, JSON.stringify(this.users), 'utf8', (err) => {
			if (err) {
				console.log(err);
				throw {errors: ["A general failure occurred"]};
			}
		});
	}
}

const REPOSITORY = new UsersRepository();
module.exports = {
	findAll: () => REPOSITORY.findAll(),
	findAllByRole: (role) => REPOSITORY.findAllByRole(role),
	findByName: (userName) => REPOSITORY.findByName(userName),
	findById: (userId) => REPOSITORY.findById(userId),
	insert: (newUserData) => REPOSITORY.insert(newUserData),
}
