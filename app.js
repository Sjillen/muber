const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

// connect mongoose to the mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/muber');

// Middlewares
app.use(bodyParser.json());

// Router
routes(app);

module.exports = app;