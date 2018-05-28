const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
// connect mongoose to the mongodb only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber');
}

// Middlewares
app.use(bodyParser.json());
// Requests Handler
routes(app);
// Middlewares to be executed after the request handler
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});


module.exports = app;