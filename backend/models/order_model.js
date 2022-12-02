const { array, string } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true }
  },
  orderDetails: [{

    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  }],

  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "cancelled", "refund"],
    default: "pending",
  },
  orderStatus: {
    Status: {
      type: String,
      enum: ["processing", "packed", "shipped", "delivered"],
      default: "processing",
      required: true
    },
    paymentDate: {
      type: Date,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true
    },
  },
  subTotal: {
    type: Number,
    required: true,
    default: 0,
  },

  shippingPrice: {
    type: Number,
    required: true,
    default: 50,
  },
  totalPrice: {     //subtotal+salestax+shippingprice - will be calculated at frontend
    type: Number,
    required: true,
    default: 0,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },

},)

module.exports = mongoose.model('Orders', orderSchema);