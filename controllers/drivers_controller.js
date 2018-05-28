const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there'});
    },
    /*index(req, res, next) {
        const { lng, lat } = req.query; // Express parses the query to get lng and lat
        Driver.geoNear(
            { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] }, // 1st argument is a point with coordinates
            { spherical: true, maxDistance: 200000 } // 2nd argument is options, unit of maxDistance is meter
        )
            .then(drivers => res.send(drivers))
            .catch(next);
    },*/
    index(req, res, next) {
        const {lng, lat} = req.query;

        Driver.find({
            'geometry.coordinates': {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: 200000
                }
            }
        })
            .then(drivers => res.send(drivers))
            .catch(next);
    },
    create(req, res, next) {
        const driverProps = req.body;
        Driver.create(driverProps)
            .then(driver => res.send(driver)) // send back the driver to whoever made the request
            .catch(next); // if there an error, use next to go to the next middleware (a error handler
    },
    edit(req, res, next) {
        const driverId = req.params.id; // get the wildcard id from the url
        const driverProps = req.body;
        Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
            .then(() => Driver.findById({ _id : driverId })) // findByIdAndUpdate does not return the updated object so we have to find it manually
            .then(driver => res.send(driver))
            .catch(next);
    },
    delete(req, res, next) {
        const driverId = req.params.id;
        Driver.findByIdAndRemove({ _id: driverId })
            .then(driver => res.status(204).send(driver))
            .catch(next);
    }
};