const express = require('express');
const router= express.Router();
const createError=require('http-errors')
const User = require('../models/user_model')
require('../helpers/init_mongodb');
const {verifyAccessToken}=require('../helpers/jwt_helper');
const UserController = require('../controllers/user_controllers')


router.get('/getProfile',verifyAccessToken,UserController.getProfile)

module.exports = router;
