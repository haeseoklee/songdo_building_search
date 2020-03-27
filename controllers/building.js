
exports.getIndex = (req, res, next) => {
    res.render('main');
}

exports.getSongdoBuildings = (req, res, next) => {
    res.render('buildings', {});
}

exports.getChungraBuildings = (req, res, next) => {
    res.render('buildings', {});
}

exports.getBuilding = (req, res, next) => {
    res.render('building', {});
}