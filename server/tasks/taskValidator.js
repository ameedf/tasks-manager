const usersRepository = require('../users/usersRepository');
const stringValidator = require('../utils/stringValidator');

const validate = newTaskData => {
	let {userId, description} = newTaskData;
	let errors = [];
	if (description) {
		description = description.trim();
	}
	stringValidator.checkString('Task description', description, 3, 200, errors);
	const user = usersRepository.findById(userId);
	if (!user) {
		errors.push("Invalid user ID");
	}
	if (errors.length === 0) {
		errors = null;
	}
	return {userId, description, errors};
}

module.exports = {validate}
