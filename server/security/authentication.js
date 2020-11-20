const roles = require('./roles');

const isAuthorized = (req, res, allowedRoles) => {
	if (!req.session || !req.session.user) {
		res.status(401).send({errors: ["Please login"]});
		return false;
	}

	if (typeof allowedRoles === 'string') {
		allowedRoles = [allowedRoles];
	}
	if ((allowedRoles.length === 1 && allowedRoles[0] === roles.ALL)
		|| allowedRoles.find(r => r === req.session.user.role)) {
		return true;
	}
	res.status(403).send({errors: ["Illegal operation"]});
	return false;
}

module.exports = {
	isAuthorized
}
