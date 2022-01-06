const express = require('express');
const purchasesRouter = express.Router();
const Transaction = require('../models/Transaction');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const verifyToken = require('./utils').verifyToken;

purchasesRouter.get('/', verifyToken, (req, res) => {
	Purchase.getAll(req.decoded.id, (err, response) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json(response);
	});
});

purchasesRouter.post('/', verifyToken, async (req, res) => {

	// insert into purchase table, get the purchase ID
	// insert that into transactions table
	const purchases = req.body.items;
	const shipping = req.body.shipping; //reads shipping and payment from frontend, but isn't saved
	const payment = req.body.payment;

	const purchaseDate = new Date();

	for (let i=0;i<purchases.length;i++) {

		const purchase = new Purchase({
			product_id: purchases[i].product_id,
			quantity: purchases[i].quantity
		});

		Purchase.createPurchase(purchase, (err, purchaseId) => {

			if (err || !purchaseId) {
				console.log(err);
			}
			
			const transaction = new Transaction({
				customer_id: req.decoded.id,
				purchase_id: purchaseId,
				date_of_transaction: purchaseDate
			});


			Transaction.createTransaction(transaction, (err, transactionId) => {
				console.log('Creating Transaction...');
				if (err || !transactionId) {
					// return res.status(500).json(err && err.sqlMessage || 'Unable to complete purchase.');
					console.log(err)
				}
			});

		});
	}

	Cart.deleteItems(req.decoded.id, (err, res) => {
		if (err) {
			console.log(err);
			return res.status(500).json(err && err.sqlMessage || 'Unable to complete purchase.');
		}
	});

	return res.status(200).json('success');
	
});

purchasesRouter.get('/trends', verifyToken, (req, res) => {
	Purchase.getTrends(req.decoded.id, (err, response) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json(response);
	});
});

module.exports = purchasesRouter;