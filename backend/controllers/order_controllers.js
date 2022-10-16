const express = require('express');
const createError=require('http-errors');
const Order = require('../models/order_model');
const Product = require('../models/product_model')


module.exports = {
    newOrder: async(req,res,next)=>{
        const {
            shippingInfo,
            orderDetails,
            paymentStatus,
            orderStatus,
            subTotal,
            salesTax,
            shippingPrice,
            totalPrice,

        }= req.body

        const order = await Order.create({   //idk why we did order.create instead of new Order()
             shippingInfo,
             orderDetails,
             paymentStatus,
             orderStatus,
             subTotal,
             salesTax,
             shippingPrice,
             totalPrice,
             user: req.user._id,
             orderDate: Date.now()
        });
        res.status(200).json({
            success: true,
            order,
        })
        
    },

    getOrders:async(req,res,next)=>{
        Order.find({})
        .exec((error,orders)=> {
          if(error) return res.status(400).json({error});
          if(orders){
            res.status(200).json({orders});
          }
        })

    },
    deleteOrder:async(req,res,next)=>{
        try{
            await Order.findByIdAndDelete(req.params.id)
            res.status(204).json({
              success: true,
              message: "Order Deleted Successfully",
            });
        } catch(error){
          res.status(400).json({ message: "Something went wrong" });
        }
    }
}