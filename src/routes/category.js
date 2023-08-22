const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.js');


router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getCategory);
router.post('/', categoryController.insertCategory);
router.put('/:id',categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);



module.exports = router
