const express = require('express');
const User = require('../models/user_model')
require('../helpers/init_mongodb');

module.exports = {
  getProfile: async (req, res, next) => {
    User.findById(req.payload.aud).then(result => {
      res.send(result)
    });
    console.log(req.payload.aud)
  },
}