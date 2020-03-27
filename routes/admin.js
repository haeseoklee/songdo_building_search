const express = require('express');

const adminController = require('../controllers/admin');

router.get('/admin', adminController.getAdmin);

const router = express.Router();