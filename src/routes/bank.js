const express = require ('express')
const router = express.Router();
const bankController = require ('../controllers/bank.js');



router
.get('/', bankController.getAll)
.post('/', bankController.insertBank)
.delete('/:id', bankController. deleteBank);


module.exports = router