const Building = require('../models/building');
const Floor = require('../models/floor');

exports.getAdminPage = (req, res, next) => {
    res.render('admin/admin', {});
}

exports.getAdminCreatePage = (req, res, next) => {
    res.render('admin/create', {});
}

exports.getAdminDeletePage = async (req, res, next) => {
    try {
        const buildings = await Building.find();
        res.render('admin/delete', {buildings: buildings});
    } catch (err) {
        console.log(err);
    }
}

exports.getAdminUpdatePage = (req, res, next) => {
    res.render('admin/update', {});
}

exports.postAdminBuilding = async (req, res, next) => {

    const name = req.body.name;
    const address = req.body.address;
    const city = req.body.city;
    const imageUrl = req.body.imageUrl;
    const building = new Building({
        name: name,
        address: address,
        city: city,
        imageUrl: imageUrl,
        information: {
            floors: []
        }
    });
    try {
        if (req.body.information.length == 0) {
            throw new Error("저장할 층이 없습니다!");
        }
        const newBuilding = await building.save();
        try {
            await newBuilding.addFloors(newBuilding, req.body.information);
            return res.status(200).json({result: 'success', city: city});
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({result: 'fail'});
    }
}

exports.deleteAdminBuilding = async (req, res, next) => {

    const buildingId = req.body.buildingId;
    if (!buildingId)
        throw new Error("올바른 빌딩이 아닙니다.");
    try {
        await Building.findByIdAndRemove(buildingId);
        await Floor.deleteMany({
            buildingId: buildingId
        })
        res.status(200).json({
            result: 'success' 
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            result: 'fail' 
        })
    }
    
}

exports.putAdminBuilding = (req, res, next) => {
    res.status(200);
}