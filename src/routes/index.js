const express = require('express');
const router = express.Router();
const productRouter = require('../routes/products.js');
const categoryRouter = require('../routes/categories.js');
const userRouter = require('../routes/users.js');

router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/users', userRouter)


module.exports = router
