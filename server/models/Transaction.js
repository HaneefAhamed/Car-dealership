'use strict';

const sql = require('./db');

const Transaction = function(transaction) { //read state variables
	this.customer_id = transaction.customer_id;
	this.purchase_id = transaction.purchase_id;
	this.date_of_transaction = transaction.date_of_transaction;
};

Transaction.createTransaction = function createTransaction (newTransaction, result) {
	sql.query('INSERT INTO Transactions SET ?', newTransaction, function (err, res) {
		if (err) {
			result(err, null);
		} else {
			result(null, res.insertId);
		}
	});
}

module.exports = Transaction;

