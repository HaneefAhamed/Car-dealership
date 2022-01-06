const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const usersRouter = express.Router();
const User = require('../models/User');
const Business = require('../models/Business');
const verifyToken = require('./utils').verifyToken;

// creates a new user
usersRouter.post('/', (req, res) => {

	if (req.body.businessName) { //create business if it was entered
		
		const newBusiness = new Business(req.body);
		Business.createBusiness(newBusiness, function (err, businessId) {

			if (err) {
				return res.status(500).json(err || 'Failure creating business.');
			}

			const newUser = new User({
				...req.body,
				businessId
			});

			User.createUser(newUser, function (err, user) {
				if (err) {
					return res.status(404).json(err && err.sqlMessage || 'Unable to create user.');
				}
				return res.status(200).json(user);
			});
			
		});
	} else {
		const newUser = new User({
			...req.body,
			businessId: null
		});

		User.createUser(newUser, function (err, user) {
			if (err) {
				return res.status(404).json(err && err.sqlMessage || 'Unable to create user.');
			}
			return res.status(200).json(user);
		});
	}
});

// returns a user by ID
usersRouter.get('/id/:id', (req, res) => {
	const userId = req.params.id;
	User.getUserById(userId, function (err, response) {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json(response);
	});
});


usersRouter.get('/me', verifyToken, (req, res) => {
	const userId = req.decoded.id;
	User.getUserById(userId, function (err, response) {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json(response);
	});
});

// authenticates a user
usersRouter.post('/authenticate', (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).send('Both a password and username are required.');
	}

	User.getUserByEmail(req.body.email, function (err, response) {

			if (err) {
				return res.status(500).send('Something went wrong, unable to login.');
			}
	
			let user; 

			console.log(response)
			if (Array.isArray(response) && response.length === 1) {
				user = response[0];
				console.log(response)
			} else {
				return res.status(400).send('No user was found for that email.');
			}

			if (!user) {
				return res.status(400).send('No user was found for that email.');
			}
	
			const hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
			console.log(hash, '---', user.password)

			if (hash === user.password) {

				const payload = {
					id: user.customer_id,
					firstName: user.first_name,
					lastName: user.last_name
				};
	
				const token = jwt.sign(payload, '1234', {
					expiresIn: 86400
				});
	
				return res.status(200).send(token);
			} else {
				return res.status(401).send('Incorrect credentials, please try again.');
			}
	});
});

module.exports = usersRouter;