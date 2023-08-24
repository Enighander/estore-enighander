const express = require('express');
const router = express.Router();
const productController = require('../routes/products.js');
const categoryRouter = require('../routes/categories.js');

router.use('/products', productController)
router.use('/categories', categoryRouter)

module.exports = router
