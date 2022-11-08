const express = require('express')
const createError = require('http-errors')
const Order = require('../models/order_model')
const Product = require('../models/product_model')


module.exports = {

  // USER
  newOrder: async (req, res, next) => {
    const {
      shippingInfo,
      orderDetails,
      paymentStatus,
      orderStatus,
      subTotal,
      salesTax,
      shippingPrice,
      totalPrice,
    } = req.body

    const order = new Order({
      shippingInfo,
      orderDetails,
      paymentStatus,
      orderStatus,
      subTotal,
      salesTax,
      shippingPrice,
      totalPrice,
      orderDate: Date.now()
    })

    order.save().then(result => {
      result.orderDetails.forEach(async (order) => {
        const product = await Product.findById(order.productID);
        product.stock -= order.quantity;
        await product.save({ validateBeforeSave: false });
        res.status(201).json({
          message: "Success"
        })
      })
    })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  },

  // ADMIN
  getOrderById: async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return next(new Error("Order not found with this Id", 404))
    }
    res.status(200).json({
      success: true,
      order
    })
  },

  // ADMIN
  getOrderByUser: async (req, res, next) => {
    const ordersArray = []
    const email = req.params.email
    try {
      const orders = await Order.find()
      orders.forEach((order) => {
        console.log(order.shippingInfo.email)
        if (order.shippingInfo.email == email)
          ordersArray.push(order)
      })
      res.status(200).json({
        success: true,
        orders: ordersArray,
        //orders
      })
    }
    catch {
      res.status(401).json({
        message: "Error"
      })
    }
  },

  // ADMIN
  getAllOrders: async (req, res, next) => {
    Order.find({})
      .exec((error, orders) => {
        if (error)
          return res.status(400).json({ error })
        if (orders) {
          res.status(200).json({ orders })
        }
      })
  },

  deleteOrder: async (req, res, next) => {
    try {
      await Order.findByIdAndDelete(req.params.id)
      res.status(204).json({
        success: true,
        message: "Order Deleted Successfully",
      });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
}