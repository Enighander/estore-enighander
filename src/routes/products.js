const express = require('express');
const router = express.Router();
const uploadProduct = require('../middlewares/uploadProduct.js')
const productController = require('../controllers/product.js');
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middlewares/redis.js');
const {validateProductRequest} = require('../validator/product.js');



router
.get('/',productController.getAllProducts)
.get('/:id',hitCacheProductDetail,productController.getProduct)
.post('/',uploadProduct,validateProductRequest,productController.insertProduct)
.put('/:id',clearCacheProductDetail,uploadProduct,productController.updateProduct)
.delete('/:id',clearCacheProductDetail,productController.deleteProduct);





module.exports = router;