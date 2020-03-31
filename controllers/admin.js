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

exports.getAdminBuilding = (req, res, next) => {
    res.status(200);
}

exports.postAdminBuilding = (req, res, next) => {
    res.status(200);
}

exports.deleteAdminBuilding = (req, res, next) => {
    res.status(200);
}

exports.putAdminBuilding = (req, res, next) => {
    res.status(200);
}