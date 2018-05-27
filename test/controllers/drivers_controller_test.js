const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver'); // get driver from mongoose instead of model file to avoid compatibility issue with mocha

describe('Drivers controller', () => {
   it('Post to /api/drivers creates a new driver', (done) => {
       Driver.count().then(count => { // get the number of drivers before the request as count
           request(app)
               .post('/api/drivers')
               .send({ email: 'test@test.com' })
               .end(() => {
                   Driver.count().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                   });
               });
       });

   });
});