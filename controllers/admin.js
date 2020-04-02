const Building = require('../models/building');

exports.getAdminPage = (req, res, next) => {
    res.render('admin/admin', {});
}

exports.getAdminSearchPage = (req, res, next) => {
    res.render('admin/search', {});
}

exports.getAdminCreatePage = (req, res, next) => {
    res.render('admin/create', {});
}

exports.getAdminDeletePage = (req, res, next) => {
    res.render('admin/delete', {});
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

exports.deleteAdminBuilding = (req, res, next) => {
    res.status(200);
}

exports.putAdminBuilding = (req, res, next) => {
    res.status(200);
}