const express = require('express');
const cartRouter = express.Router();
const Cart = require('../models/Cart');
const verifyToken = require('./utils').verifyToken;

cartRouter.delete('/id/:id', verifyToken, (req, res) => {
;
	if (!req.params.id) {
		return res.status(400).send('No ID provided.');
	}

	Cart.delete(req.decoded.id, req.params.id, function (err, response) {
		if (err) {
			return res.status(500).json(err && err.sqlMessage || 'Unable to delete item from cart.');
		}

		return res.status(200).json(response);
	})
});

cartRouter.post('/', verifyToken, (req, res) => {

	if (req.body.product_id && req.decoded.id) {

		const cartItem = new Cart({ ...req.body, customer_id: req.decoded.id });
		Cart.create(cartItem, function (err, itemId) {

			if (err || !itemId) {
				return res.status(500).json(err && err.sqlMessage || 'Unable to add item to cart.');
			}

			return res.status(200).json(itemId);
		});
	}
});

cartRouter.get('/', verifyToken, (req, res) => {
	Cart.getAll({
		customer_id: req.decoded.id
	}, function (err, response) {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json(response);
	});
});

module.exports = cartRouter;