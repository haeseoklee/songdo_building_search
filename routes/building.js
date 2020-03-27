const express = require('express');

const buildingController = require('../controllers/building');

const router = express.Router();

router.get('/', buildingController.getIndex);

router.get('/songdo', buildingController.getSongdoBuildings);

router.get('/chungra', buildingController.getChungraBuildings);

router.get('/building/:buildingId', buildingController.getBuilding);

router.get('/building/:buildingId/:floorId', buildingController.getFloor);

module.exports = router;