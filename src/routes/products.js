const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.js');
const productController = require('../controllers/product.js');
const {protect} = require('../middlewares/auth.js');


router.get('/',protect,productController.getAllProducts);
router.get('/:id',protect,productController.getProduct);
router.post('/',protect,upload.single('image'), productController.insertProduct);
router.put('/:id',protect,upload.single('image'), productController.updateProduct);
router.delete('/:id',protect,productController.deleteProduct);





module.exports = router;