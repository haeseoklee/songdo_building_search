const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

const buildingRoutes = require('./routes/building');
const companyRoutes = require('./routes/company');
const adminRoutes = require('./routes/admin');


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(buildingRoutes);
app.use(companyRoutes);
app.use('/admin', adminRoutes);
app.use(errorController.get404);

mongoose
    .connect(
        'mongodb+srv://haeseok:pvH4EQFtGK1baflp@cluster0-obm9s.mongodb.net',
        { dbName: 'building_search', useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        app.listen(3000);
    })
    .catch(console.log);
    