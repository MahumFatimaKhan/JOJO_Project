const express = require('express');
const router= express.Router();
// const createError=require('http-errors')
// const User = require('../models/user_model')
// const {userSchema} = require("../helpers/validation_schema")
// const {signAccessToken} = require('../helpers/jwt_helper')
const AuthController = require('../controllers/auth_controllers')
//const ObjectID=require('mongodb').ObjectId;

router.post('/register',AuthController.register);

router.post('/login',AuthController.login);

// router.post('/refresh-token',async(req,res,next)=>{
//     try {
//         const { refreshToken } = req.body
//         if (!refreshToken) throw createError.BadRequest()
//         const userId = await verifyRefreshToken(refreshToken)
  
//         const accessToken = await signAccessToken(userId)
//         const refToken = await signRefreshToken(userId)
//         res.send({ accessToken: accessToken, refreshToken: refToken })
//       } catch (error) {
//         next(error)
//       }
// });

module.exports = router;