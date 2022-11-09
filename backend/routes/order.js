const express = require('express')
const router = express.Router()
const { verifyAccessToken, adminMiddleware } = require('../helpers/jwt_helper')
const orderController = require('../controllers/order_controllers')

// USER
router.post('/newOrder', orderController.newOrder)

// ADMIN ACCESS NEEDED
router.get('/getAllOrders', verifyAccessToken, adminMiddleware, orderController.getAllOrders)
router.get('/getOrderById/:id', verifyAccessToken, adminMiddleware, orderController.getOrderById)
router.get('/getOrderByUser/:email', verifyAccessToken, adminMiddleware, orderController.getOrderByUser)
router.put('/updateOrderStatus/:id/:status', verifyAccessToken, adminMiddleware, orderController.updateOrderStatus)
router.put('/updatePaymentStatus/:id/:status', verifyAccessToken, adminMiddleware, orderController.updatePaymentStatus)
router.delete('/deleteOrder/:id', verifyAccessToken, adminMiddleware, orderController.deleteOrder)


module.exports = router;