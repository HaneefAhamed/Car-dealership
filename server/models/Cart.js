'use strict';

const sql = require('./db');

const Cart = function(product) { //read state variables
	this.customer_id = product.customer_id;
	this.product_id = product.product_id;
};

Cart.delete = (customer_id, product_id, result) => {
	sql.query('DELETE FROM cart WHERE customer_id = ? AND product_id = ?', [customer_id, product_id], (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
		} else {
			result(null, res.insertId);
		}	
	});
}

Cart.deleteItems = (customer_id, result) => {
	sql.query('DELETE FROM cart WHERE customer_id = ?', customer_id, (err, res) => {
		if (err) {
			console.log(err)
			result(err, null);
		} else {
			result(null, res.insertId);
		}	
	});
}

Cart.create = (newProduct, result) => {
	sql.query('INSERT INTO cart SET ?', newProduct, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res.insertId);
		}	
	});
}

Cart.getAll = (options, result) => {
	const query = `SELECT p.* FROM product p, customer c, cart WHERE cart.product_id = p.product_id AND cart.customer_id = c.customer_id AND c.customer_id = ?`;
	sql.query(query, options.customer_id, (err, rows) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, rows);
	});
};
module.exports = Cart;