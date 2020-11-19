const stringValidator = require('../utils/stringValidator');
const roles = require('../security/roles');
const allowedRoles = [roles.TEAM_LEADER, roles.DEVELOPER];

const validate = newUserData => {
	let {userName, password, role} = newUserData;
	let errors = [];
	if (userName) {
		userName = userName.trim().toLowerCase();
	}
	stringValidator.checkString('User name', userName, 3, 20, errors);
	stringValidator.checkString('Password', password, 3, 10, errors);
	if (role) {
		role = role.trim().toUpperCase();
	}
	stringValidator.checkString('role', role, null, null, errors);
	if (!allowedRoles.find(r => r === role)) {
		errors.push("Invalid role");
	}
	if (errors.length === 0) {
		errors = null;
	}
	return {userName, password, role, errors};
}

module.exports = {validate}
