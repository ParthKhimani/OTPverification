const express = require('express');
const Sequelize = require("sequelize");
const router = require('./routes/router');
const bodyParser = require('body-parser');
const sequelize = require('./util/database')

const app = express();

app.set('view engine','ejs');
app.set('views','view');
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync();
app.use(express.static('views'));
app.use('/', router);

app.listen(7000);