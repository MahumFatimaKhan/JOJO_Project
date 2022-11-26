const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../models/user_model')
const { userSchema } = require("../helpers/validation_schema")
const { signAccessToken } = require('../helpers/jwt_helper')


module.exports = {
  register: async (req, res, next) => {
    console.log(req.body)
    console.log("Inside Register")
    try {

      const result = await userSchema.validateAsync(req.body)
      console.log(result)

      const doesExist = await User.findOne({ email: result.email })
      if (doesExist) {
        throw createError.Conflict(result.email + ' has already been registered')
      }
      const user = new User(result)
      const savedUser = await user.save()
      const accessToken = await signAccessToken(savedUser.id)
      // const refreshToken = await signRefreshToken(savedUser.id)
      return res.status(201).json({
        success: true,
        message: "User Created Successfully"
      })
      //    res.send({accessToken, refreshToken})
    }
    catch (error) {
      //422 means client is sending something wrong
      if (error.isJoi === true) error.status = 422
      next(error);
    }

    //res.send("register route")
  },
  login: async (req, res, next) => {
    //res.send("login route")
    try {
      const { email, password } = req.body;

      // checking if user has given password and email both

      if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        throw createError.NotFound("User not registered");
      }

      const isPasswordMatched = await user.isValidPassword(password);

      if (!isPasswordMatched) {
        throw createError.Unauthorized("Username/Password not valid")
      }

      //  sendToken(user, 200, res);
      // const result = await userSchema.validateAsync(req.body)
      // const user=await User.findOne({email:result.email})
      // if(!user) throw createError.NotFound("User not registered")

      // const isMatch = await user.isValidPassword(result.password)
      // if(!isMatch) throw createError.Unauthorized("Username/Password not valid")

      const accessToken = await signAccessToken(user.id)
      const role = user.role
      //   const refreshToken = await signRefreshToken(user.id)
      res.send({ accessToken, role })
      //  res.send({accessToken, refreshToken})

    }
    catch (error) {
      if (error.isJoi === true) return next(createError.BadRequest("Invalid Username or Password"))
      next(error)
    }
  }
};