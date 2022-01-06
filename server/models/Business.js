'use strict';

const sql = require('./db');

const Business = function(business) { //read state variables
	this.fax = business.fax;
	this.bname = business.businessName;
	this.website = business.website;
};

Business.createBusiness = (newBusiness, result) => {
	sql.query('INSERT INTO business SET ?', newBusiness, function (err, res) {
		if (err) {
			result(err, null);
		} else {
			result(null, res.insertId);
		}	
	});
}

module.exports = Business;