const bcrypt = require('bcrypt');
const userRepository = require('./usersRepository');
const router = require('express').Router();
const remove = require('../utils/propertiesRemover');
const authentication = require('../security/authentication');
const roles = require('../security/roles');

router.post('/login', async (req, res) => {
	const { userName, password } = req.body;
	const user = await userRepository.findByName(userName);
	if (!user) {
		res.status(401).send({ errors: ["Bad user name or password"] });
	} else {
		await bcrypt.compare(password, user.password, (err, match) => {
			if (err) {
				res.status(500).send({ errors: [err.message] })
			} else {
				if (match) {
					const sessionUser = remove(user, ["password"]);
					req.session.user = sessionUser;
					res.cookie('userId', user.id);
					res.send(sessionUser);
				} else {
					res.status(401).send({ errors: ["Bad user name or password"] });
				}
			}
		});
	}
});

router.post('/logout', (req, res) => {
	if (req.session && req.session.user) {
		req.session.user = null;
		res.send({ msg: "OK" })
	} else {
		res.status(401).send({ errors: ['User is not yet authorized'] })
	}
});

router.post('/register', async (req, res) => {
	const newUserData = req.body;
	try {
		const newUser = await userRepository.insert(newUserData);
		res.send(remove(newUser, ["password"]));
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get('/developers', async (req, res) => {
	if (authentication.isAuthorized(req, res, roles.TEAM_LEADER)) {
		const developers = await userRepository.findAllByRole(roles.DEVELOPER);
		const convertedDevelopers = developers.map(user => remove(user, ["password"]));
		res.send(convertedDevelopers);
	}
})
module.exports = router;
