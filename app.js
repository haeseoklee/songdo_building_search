const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

const buildingRoutes = require('./routes/building');
const companyRoutes = require('./routes/company');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(buildingRoutes);
app.use(companyRoutes);

app.use(errorController.get404);

mongoose
    .connect(
        'mongodb+srv://haeseok:5uG9X8t9AW2m1ZUX@cluster0-obm9s.mongodb.net/building_search?retryWrites=true&w=majority',
    )
    .then(() => {
        app.listen(3000);
    })
    .catch(console.log);
    