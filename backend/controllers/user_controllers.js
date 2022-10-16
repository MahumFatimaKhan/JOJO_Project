const express = require('express');
const router= express.Router();
const createError=require('http-errors')
const User = require('../models/user_model')
require('../helpers/init_mongodb');
const {verifyAccessToken}=require('../helpers/jwt_helper');

module.exports = {
    getProfile: async(req,res,next)=>{
        User.findById(req.payload.aud).then(result=>{
         res.send(result)
        });
      console.log(req.payload.aud)
       
   
   }
}