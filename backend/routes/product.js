const express = require('express');
const router = express.Router();
const multer = require('multer')
const productController = require('../controllers/product_controllers')
const shortid = require('shortid')
const path = require('path')
const { verifyAccessToken, adminMiddleware } = require('../helpers/jwt_helper');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname)
    }
})


const upload = multer({ storage })


//ADMIN ONLY
router.post('/create', verifyAccessToken, adminMiddleware, upload.array('productPictures'), productController.createProduct);
router.get('/getAllProducts', verifyAccessToken, adminMiddleware, productController.getAllProducts);
router.delete('/deleteProduct/:id', verifyAccessToken, adminMiddleware, productController.deleteProduct);
router.put('/updateProduct/:id', verifyAccessToken, adminMiddleware, productController.updateProduct);

//USERS
router.get('/getProductDetails/:id', productController.getProductDetails);
router.get('/getProducts', productController.getProducts);
router.get('/getProductByCategory/:categoryID', productController.getProductByCategory);

module.exports = router;