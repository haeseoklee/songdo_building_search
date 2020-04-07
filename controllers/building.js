const Building = require('../models/building');
const Floor = require('../models/floor');

exports.getIndex = (req, res, next) => {
    res.render('index');
}

exports.getSongdoBuildings = async (req, res, next) => {
    try {
        const buildings = await Building.find({'city': 'songdo'});
        res.render('building/buildings', {buildings: buildings});
    } catch (err) {
        console.log(err);
    }
}

exports.getChungraBuildings = async (req, res, next) => {
    try {
        const buildings = await Building.find({'city': 'chungra'});
        res.render('building/buildings', {buildings: buildings});
    } catch (err) {
        console.log(err);
    }
}

exports.getBuilding = async (req, res, next) => {
    const buildingId = req.params.buildingId;
    try {
        const building = await Building.findById(buildingId);
        const floorInfos = building.information.floors.map((floor) => {
            const floorInfo = Floor.findById(floor.floorId);
            return floorInfo;
        })
        const floors = await Promise.all(floorInfos);
        res.render('building/building', {building: building, floors: floors});
    } catch (err) {
        console.log(err);
    }
}

exports.getFloor = async (req, res, next) => {
    const buildingId = req.params.buildingId;
    const floorId = req.params.floorId;
    try {
        const building = await Building.findById(buildingId);
        const floor = await Floor.findById(floorId);
        res.render('building/floor', {building: building, floor: floor});
    } catch (err) {
        console.log(err);
    }
}