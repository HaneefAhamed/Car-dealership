'use strict';

const sql = require('./db');

const Purchase = function(purchase) { //read state variables
	this.product_id = purchase.product_id;
	this.quantity_sold = purchase.quantity;
};

// insert
Purchase.createPurchase = (newPurchase, result) => {
	sql.query('INSERT INTO Purchases SET ?', newPurchase, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			sql.query('UPDATE Product SET quantity_remaining = (quantity_remaining - ?) WHERE product_id = ? ', [newPurchase.quantity_sold, newPurchase.product_id], function(err) {
				result(null, res.insertId);
			});
		}	
	});
}

Purchase.getTrends = (customer_id, result) => {
	const query = `SELECT COUNT(*) as totalPurchaseCount From Transactions WHERE customer_id = ?`;
	sql.query(query, customer_id, (firstError, firstRows) => {
		if (firstError) {
			result(firstError, null);
		} else {

			const query2 = `SELECT Category.category_name as most_purchased_cat FROM Product
			JOIN Purchases ON Product.product_id = Purchases.product_id
			LEFT JOIN Category ON Product.category_id = Category.category_id
			LEFT JOIN Transactions ON Purchases.purchase_id = Transactions.purchase_id
			WHERE Transactions.customer_id = ?
			GROUP BY Category.category_name
			ORDER BY most_purchased_cat ASC LIMIT 1`;

			sql.query(query2, customer_id, (secondErr, secondRows) => {
				if (secondErr) {
					result(secondErr, null);
				} else {
					let totalPurchaseCount = firstRows && firstRows[0] && firstRows[0].totalPurchaseCount || null;
					let mostPurchasedCat = secondRows && secondRows[0] && secondRows[0].most_purchased_cat || null;
					result(null, { totalPurchaseCount, mostPurchasedCat });
				}
			});
		}	
	});
}

Purchase.getAll = function getAll (customer_id, result) {
	const query = `SELECT * FROM Purchases
	JOIN Product ON Product.product_id = Purchases.product_id
	JOIN Transactions ON Purchases.purchase_id = Transactions.purchase_id
	LEFT JOIN Category ON Category.category_id = Product.category_id
	WHERE Transactions.customer_id = ?`;
	sql.query(query, customer_id, function (err, rows) {
		if (err) {
			result(err, null);
		} else {
			console.log(rows)
			result(null, rows);
		}	
	});
}

module.exports = Purchase;