const express = require('express');
const router = express.Router();
const categoryController = require ('../controllers/category.js')
const {protect} = require('../middlewares/auth.js');


router.get('/', protect,categoryController.getAllCategory);
router.get('/:id', protect,categoryController.getCategory);
router.post('/', protect,categoryController. insertCategory);
router.put('/:id', protect,categoryController. updateCategory);
router.delete('/:id', protect,categoryController.deleteCategory);



module.exports = router
