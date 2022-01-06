'use strict';

const sql = require('./db');

const Product = function(product) { //read state variables
	this.name = product.name;
	this.created_at = new Date();
};

Product.getProductById = function (_id, result) {
	sql.query('SELECT * FROM product p, Category c WHERE p.product_id = ? AND p.category_id = c.category_id', _id, function (err, res) {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, res);
	});
}

Product.getAll = function(options, result) {

	const query = `SELECT COUNT(*) as count FROM product WHERE (name LIKE ${sql.escape(`%${options.query || ''}%`)} OR description LIKE ${sql.escape(`%${options.query || ''}%`)}) ${options.categoryId ? `AND category_id = ${options.categoryId}` : ''} ORDER BY price ${options.priceSort || 'ASC'}`;
	console.log(query);
	sql.query(query, function (err, countRows) {
		
		if (err) {
			result(err, null);
			return;
		}

		if (!countRows || countRows.length < 1) {
			result('No rows were found.', null);
		}

		const count = countRows[0] && countRows[0].count;
		
		sql.query(`SELECT * FROM product WHERE (name LIKE ${sql.escape(`%${options.query || ''}%`)} OR description LIKE ${sql.escape(`%${options.query || ''}%`)}) ${options.categoryId ? `AND category_id = ${options.categoryId}` : ''} ORDER BY price ${options.priceSort || 'ASC'} LIMIT ${options.limit} OFFSET ${options.offset}`, function (err, productRows) {
			if (err) {
				console.log(err);
				result(err, null);
				return;
			}
			result(null, { products: productRows, count, limit: options.limit, offset: options.offset });
		});
	});
}

module.exports = Product;
