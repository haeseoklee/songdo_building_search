const Building = require('../models/building');
const Floor = require('../models/floor');

exports.getIndex = (req, res, next) => {
    res.render('index');
}

exports.getSongdoBuildings = async (req, res, next) => {
    const buildings = await Building.find({'city': 'songdo'});
    res.render('building/buildings', {buildings: buildings});
}

exports.getChungraBuildings = async (req, res, next) => {
    const buildings = await Building.find({'city': 'chungra'});
    res.render('building/buildings', {buildings: buildings});
}

exports.getBuilding = async (req, res, next) => {
    const buildingId = req.params.buildingId;
    const building = await Building.findById(buildingId);
    const floorInfos = building.information.floors.map((floor) => {
        const floorInfo = Floor.findById(floor.floorId);
        return floorInfo;
    })
    const floors = await Promise.all(floorInfos);
    res.render('building/building', {building: building, floors: floors});
}

exports.getFloor = async (req, res, next) => {
    const floorId = req.params.floorId;
    const floor = await Floor.findById(floorId);
    res.render('building/floor', {floor: floor});
}