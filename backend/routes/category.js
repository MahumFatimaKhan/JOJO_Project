const slugify= require('slugify');
const express = require('express');
const router= express.Router();
const {verifyAccessToken, adminMiddleware}=require('../helpers/jwt_helper');
const CategoryController = require('../controllers/category_controllers')
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//ADMIN ONLY
router.post('/create',verifyAccessToken,adminMiddleware,upload.single("categoryPicture"), CategoryController.create);
router.get('/searchCategory/:name',verifyAccessToken,adminMiddleware, CategoryController.searchCategory);
router.delete('/deleteCategories/:id', verifyAccessToken, adminMiddleware,CategoryController.deleteCategories)
//NEED TO CHECK UPDATE CATEGORY ON POSTMAN FIRST
//router.put('/update',verifyAccessToken,adminMiddleware,upload.single("categoryPicture"), CategoryController.updateCategories);


//NOT YET CONFIRMED WHO CAN ACCESS
router.get('/getCategories',CategoryController.getCategories);


module.exports = router;
