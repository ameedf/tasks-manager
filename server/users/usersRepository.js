const bcrypt = require('bcrypt');
const validator = require('./userValidator');
const dbService = require('../utils/dbService');

class UsersRepository {
	findAll() {
		return dbService.executeQuery("SELECT * FROM users");
	}

	findAllByRole(role) {
		if (!role) {
			return [];
		}
		return dbService.executeQuery("SELECT * FROM users WHERE role = ?", [role]);
	}

	async findByName(userName) {
		userName = userName.trim().toLowerCase();
		const list = await dbService.executeQuery("SELECT * FROM users WHERE name = ?", [userName])
		return !list || list.length === 0 ? null : list[0];
	}

	async findById(userId) {
		const list = await dbService.executeQuery("SELECT * FROM users WHERE id = ?", [userId]);
		return !list || list.length === 0 ? null : list[0];
	}

	async insert(newUserData) {
		const { userName, password, role, errors } = validator.validate(newUserData);
		if (errors) {
			throw { errors };
		}
		const user = await this.findByName(userName);
		if (user) {
			throw { errors: ["User already exists"] };
		}
		const hash = await bcrypt.hash(password, 10);
		const createdAt = Date.now();
		const newUser = { name: userName, password: hash, role, createdAt };
		const results = await dbService.executeQuery("INSERT INTO users SET ?", newUser);
		return { id: results.insertId, ...newUser };
	}
}

const REPOSITORY = new UsersRepository();
module.exports = REPOSITORY;
