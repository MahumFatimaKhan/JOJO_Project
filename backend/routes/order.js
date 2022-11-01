const slugify = require('slugify');
const express = require('express');
const router = express.Router();
const { verifyAccessToken, adminMiddleware } = require('../helpers/jwt_helper');
const orderController = require('../controllers/order_controllers')

// USER
router.post('/newOrder', orderController.newOrder);

// ADMIN ACCESS NEEDED
router.delete('/deleteOrder/:id', verifyAccessToken, adminMiddleware, orderController.deleteOrder);
router.get('/getOrders', verifyAccessToken, adminMiddleware, orderController.getOrders);



module.exports = router;