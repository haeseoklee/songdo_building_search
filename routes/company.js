const express = require('express');

const companyController = require('../controllers/company');

const router = express.Router();

router.get('/company/inform', companyController.getCompanyInform);

module.exports = router;