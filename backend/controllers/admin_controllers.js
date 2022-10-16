const express = require('express');
const router= express.Router();
const createError=require('http-errors')
const User = require('../models/user_model')
const {userSchema} = require("../helpers/validation_schema")
const {signAccessToken} = require('../helpers/jwt_helper')


module.exports = {
    register: async(req,res,next)=>{
        console.log(req.body)
        try{
       
            
            const result = await userSchema.validateAsync(req.body)
            const doesExist = await User.findOne({email : result.email})
            if(doesExist){
                throw createError.Conflict(result.email +' has already been registered')
            }

            const {
                name, email,password
            } = req.body;

            const user= new User({
                name , email , password , role :'admin'
            })

            //const user=new User(result)
            const savedUser = await user.save()
            const accessToken = await signAccessToken(savedUser.id)
           // const refreshToken = await signRefreshToken(savedUser.id)
            res.send('Admin Created Successfully')
        //    res.send({accessToken, refreshToken})
        }
        catch(error){
            //422 means client is sending something wrong
            if(error.isJoi === true) error.status = 422
            next(error);
        }
    
        //res.send("register route")
    },
    login: async(req,res,next)=>{
        //res.send("login route")
        try{
            const result = await userSchema.validateAsync(req.body)
            const user=await User.findOne({email:result.email})
            if(!user) throw createError.NotFound("Admin not registered")
    
            const isMatch = await (user.isValidPassword(result.password) && user.role==='admin')
            if(!isMatch) throw createError.Unauthorized("Email/Password not valid")
    
            const accessToken = await signAccessToken(user.id)
            
         //   const refreshToken = await signRefreshToken(user.id)
         res.send({accessToken})
          //  res.send({accessToken, refreshToken})
    
        }
        catch(error){
            if(error.isJoi ===true) return next(createError.BadRequest("Invalid Username or Password"))
           next(error)
        }
    }
};