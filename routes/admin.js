const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getAdminPage);

router.get('/create-page', adminController.getAdminCreatePage);

router.get('/delete-page', adminController.getAdminDeletePage);

router.get('/update-page', adminController.getAdminUpdatePage);


router.post('/building', adminController.postAdminBuilding);

router.delete('/building', adminController.deleteAdminBuilding);

router.put('/building', adminController.putAdminBuilding);

module.exports = router;