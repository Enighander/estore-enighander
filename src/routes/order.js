const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.js')

router
.get("/", orderController.getAllOrder)
.get("/user_id/:user_id", orderController.getOrderByUserId)
.get("/user/:user_id/:status_orders", orderController.getStatusByUserId)
.put("/:id/processed",orderController.updateStatusProcessed)
.put("/:id/sent",orderController.updateStatusSent)
.put("/:id/complete",orderController.updateStatusCompleted)
.put("/:id/cancel",orderController.updateStatusCanceled)
.put("/:id", orderController.update)
.post("/", orderController.insert)
.delete("/:id", orderController.delete);



module.exports = router