const mongoose = require('mongoose');

before(done => {
    // make sure to connect to the test db before testing
    mongoose.connect('mongodb://localhost/muber_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning: ' + err );
            done();
        });

});

beforeEach(done => {
   const { drivers } = mongoose.connection.collections;
   drivers.drop()
       .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' })) // make sure the index is recreated after dropping the collection
       .then(() => done())
       .catch(() => done());
});