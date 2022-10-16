const express = require('express');
const router= express.Router();
const AdminController = require('../controllers/admin_controllers')

router.post('/register',AdminController.register);

router.post('/login',AdminController.login);


module.exports = router;