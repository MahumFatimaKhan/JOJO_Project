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
    const { name, price, description, stock, color, category } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
      //you can add here "/public/" before req.files
      productPictures = req.files.map(file => {
        return { img: file.filename }
      });
    }

    const product = new Product({
      name: name,
      slug: slugify(name),
      price, description, productPictures, stock, color, category
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
      productCount
    })
  },


  //GET ALL PRODUCTS - WILL BE USED BY ADMIN
  getAllProducts: async (req, res) => {

    Product.find({})
      .exec((error, products) => {
        if (error) return res.status(400).json({ error });
        if (products) {
          res.status(200).json({ products, productCount });
        }
      })
  },

  //GET PRODUCT DETAIL BY ID
  getProductDetails: async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
      productCount
    });
  },
  //UPDATE PRODUCT ADMIN ONLY
  // updateProduct: async(req,res,send){

  // }

  //GET PRODUCT BY CATEGORY
  getProductByCategory: async (req, res, next) => {
    const findCategory = req.params.categoryID
    const product = await Product.find({ category: findCategory })
    if (!product) {
      return next(new ErrorHander("Something went wrong", 404));
    }

    res.status(200).json({
      success: true,
      product,

    });

    //     const requestperpage= 8;
    //     const productCount=await Product.countDocuments();
    //     const { slug } = req.params;
    //   Category.findOne({ slug: slug })
    //     .select("_id type")
    //     .exec((error, category) => {
    //       if (error) {
    //         return res.status(400).json({ error });
    //       }
    //       if (category) {
    //         Product.find({ category: category._id }).exec((error, products) => {
    //           if (error) {
    //             return res.status(400).json({ error });
    //           }

    // })
    // }
    //     })

  },

  //UPDATE PRODUCT but does not upload picture- ADMIN ONLY
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


