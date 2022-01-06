const express = require('express');
const Category = require('../models/Category');

const categoriesRouter = express.Router();

categoriesRouter.get('/', (req, res) => {
	Category.getAll(null, (err, response) => {
		if (err) {
			return res.status(500).send(err);
		}
		return res.status(200).send(response);
	});
});

categoriesRouter.get('/id/:id', (req, res) => {

	const catId = req.params.id;
	
	Category.getCategoryById(catId, (err, response) => {
		if (err) {
			return res.status(500).send(err);
		}
		return res.status(200).send(response);
	});
});

module.exports = categoriesRouter;