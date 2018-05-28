const DriversContoller = require('../controllers/drivers_controller');

module.exports = (app) => {
    // Watch for incoming requests of method GET
    // to the route http://localhost:3050/api
    app.get('/api', DriversContoller.greeting);

    app.post('/api/drivers', DriversContoller.create);

    app.put('/api/drivers/:id', DriversContoller.edit);

    app.delete('/api/drivers/:id', DriversContoller.delete);

    app.get('/api/drivers', DriversContoller.index);
};