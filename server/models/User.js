'use strict';
const crypto = require('crypto');
const sql = require('./db');

const User = function(user) { //read state variables
	this.first_name = user.firstName;
	this.last_name = user.lastName;
	this.password = user.password;
	this.phone = user.phone;
	this.zipcode = user.zipcode;
	this.city = user.city;
	this.state_id = user.state_id;
	this.bid = user.businessId;
	this.email = user.email;
	this.address = user.address;
};

User.createUser = function createUser (newUser, result) {
	console.log(newUser);
	var phoneFormat = /^[\+]?[0-9]{0,2}[0-9]{10}$/;
	var emailFormat = /.+@.+/; //tests for format [non-empty string]@[non-empty string]
	if (!phoneFormat.test(newUser.phone || !emailFormat.test(newUser.email))) {
		console.log('Email or phone input is in an invalid format, user creation aborted')
		result({sqlMessage: 'There was an error entering your phone number or email. Please input with correct format'}, null);
	}

	const hash = crypto.createHash('sha256').update(newUser.password).digest('hex'); //hash password before entering in database
	newUser.password = hash;
	console.log(newUser.password)

	sql.query('SELECT customer_id FROM Customer WHERE email = ?', newUser.email, function (err, res) {
		if (res.length === 0) { //check if customer email exists before creating an entry
			sql.query('INSERT INTO Customer SET ?', newUser, function (err, res) {
				if (err) {
					result(err, null);
				} else {
					result(null, res.insertId);
				}	
			});
		} else {
			result({ sqlMessage: 'A user with that email already exists.' }, null);
		}

	});
}

User.getUserByEmail = function getUserByEmail(email, result) {
	
	sql.query('SELECT * FROM Customer c, Business b WHERE c.email = ? AND (c.bid = b.bid OR c.bid IS NULL) LIMIT 1', email, function (err, res) {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		console.log(res);
		result(null, res);
	});
};

User.getUserById = function getUserById(id, result) {
	sql.query('SELECT * FROM Customer c, Business b WHERE c.customer_id = ? AND (c.bid = b.bid OR c.bid IS NULL) LIMIT 1', id, function (err, res) {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, res);
	});
};

module.exports = User;