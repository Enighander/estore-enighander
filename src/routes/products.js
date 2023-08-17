const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.js');



router.get('/', productController.getAllProducts);
router.get('/:id',productController.getProduct);
router.post('/', productController.insertProduct);
router.put('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);





module.exports = router