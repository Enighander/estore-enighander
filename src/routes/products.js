const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.js');
const productController = require('../controllers/product.js');
const {protect} = require('../middlewares/auth.js');
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middlewares/redis.js');
const {validateProductRequest} = require('../validator/product.js');


router.get('/',protect,productController.getAllProducts);
router.get('/:id',protect,hitCacheProductDetail,productController.getProduct);
router.post('/',protect,upload.single('image'),validateProductRequest,productController.insertProduct);
router.put('/:id',protect,clearCacheProductDetail,upload.single('image'),productController.updateProduct);
router.delete('/:id',protect,clearCacheProductDetail,productController.deleteProduct);





module.exports = router;