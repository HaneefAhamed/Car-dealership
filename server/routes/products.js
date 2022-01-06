const express = require('express');
const productsRouter = express.Router();
const Product = require('../models/Product');

productsRouter.get('/', (req, res) => {
	const options = {
		offset: parseInt(req.query.offset, 10) || 0,
		limit: parseInt(req.query.limit, 10) || 10,
		priceSort: req.query.price,
		query: req.query.q,
		categoryId: req.query.cat || null
	};
	Product.getAll(options, (err, response) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json(response);
	});
});

productsRouter.get('/id/:id', (req, res) => {

	const productId = req.params.id;
	
	Product.getProductById(productId, (err, response) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json(response);
	});
});

module.exports = productsRouter;