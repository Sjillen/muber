const DriversContoller = require('../controllers/drivers_controller');

module.exports = (app) => {
    // Watch for incoming requests of method GET
    // to the route http://localhost:3050/api
    app.get('/api', DriversContoller.greeting);
};