const express = require('express');
const router = express.Router();
const createError = require('http-errors');
require('../helpers/init_mongodb');
const ApiFeatures = require('../helpers/api_features')
const { default: slugify } = require('slugify');
const Product = require('../models/product_model');
const shortid = require('shortid');


module.exports = {

  // CREATE PRODUCT ADMIN ONLY
  createProduct: (req, res, next) => {
    const { name, price, description, stock, color, category, productPictures } = req.body;

    const product = new Product(
      {
        name: name,
        slug: slugify(name),
        SKU, price, description, stock, color, category, productPictures
      })
    product.save((error, product) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (product) {
        return res.status(201).json({ product });
      }
    })
  },

  //GET ALL PRODUCTS - BASED ON SEARCH FILTER
  getProducts: async (req, res) => {
    const resultPerPage = 12;
    const productCount = await Product.countDocuments();


    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search().pagination(resultPerPage)
    let products = await apiFeature.query;

    res.status(200).json({
      success: true,
      products,

    })
  },


  //GET ALL PRODUCTS - WILL BE USED BY ADMIN
  getAllProducts: async (req, res) => {

    Product.find({})
      .exec((error, products) => {
        if (error) return res.status(400).json({ error });

        if (products) {
          res.status(200).send(products);
        }
      })
  },

  //GET PRODUCT DETAIL BY ID
  getProductDetails: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHander("Product not found", 404));
      }

      res.status(200).send(product)
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  },
  //GET PRODUCT BY CATEGORY
  getProductByCategory: async (req, res, next) => {
    try {
      const findCategory = req.params.categoryID
      const product = await Product.find({ category: findCategory })
      if (!product) {
        return next(new ErrorHander("Something went wrong", 404));
      }

      res.status(200).send(product)
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  },

  //UPDATE PRODUCT- ADMIN ONLY
  updateProduct: async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found"
      })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
    res.status(200).json({
      success: true,
      message: "Product Updated",
      product
    })
  },

  //DELETE ONE PRODUCT USING ID - ADMIN ONLY
  deleteProduct: async (req, res, next) => {
    try {
      await Product.findByIdAndDelete(req.params.id)
      res.status(204).json({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  },

}


