'use strict';

const sql = require('./db');

const Category = function(product) {
	this.name = product.name;
	this.created_at = new Date();
};

Category.getAll = function (options, result) {
	const query = `SELECT * FROM Category`;
	sql.query(query, function (err, rows) {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, rows);
	});
};

Category.getCategoryById = function(categoryId, result) {
	if (!categoryId) {
		result('No category ID provided', null);
		return;
	}

	const query = `
		SELECT Product.*, Purchases.product_id, SUM(quantity_sold) AS sum
		FROM Purchases JOIN Product ON Purchases.product_id = Product.product_id
		WHERE Product.category_id = ${categoryId}
		GROUP BY Purchases.product_id
		ORDER BY sum DESC
		LIMIT 3`;

	sql.query(query, (err, res) =>{
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, res);
	});
}

module.exports = Category;