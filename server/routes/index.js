'use strict';

const express = require('express');
const productRouter = require('./products');
const categoriesRouter = require('./categories');
const usersRouter = require('./users');
const cartRouter = require('./cart');
const purchasesRouter = require('./purchases');

const apiRouter = express.Router();

apiRouter
	
	.use('/users', usersRouter)
	.use('/products', productRouter)
	.use('/categories', categoriesRouter)
	.use('/cart', cartRouter)
	.use('/purchases', purchasesRouter)
	.use('/', (_, res) => res.send('API is up and running'));

module.exports = apiRouter;