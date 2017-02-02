//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
//let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

/*
* Test the /GET route
 */
 describe('Test status message', () => {
   var host = 'http://0.0.0.0:3000';
/*
     it('test.', (done) => {
       chai.request(host)
           .get('/api/Messages/status')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.status.should.equal('Sorry, we are closed. Open daily from 6am to 8pm.');
          //     res.body.length.should.be.eql(0);
             done();
           });
     });
*/
     var currentDate = new Date();
     var currentHour = currentDate.getHours();
     var OPEN_HOUR = 6;
     var CLOSE_HOUR = 20;
     it('it should GET Open message if localtime is within 6am to 8pm, otherwise sorry message.', (done) => {
       chai.request(host)
           .get('/api/Messages/status')
           .end((err, res) => {
               res.should.have.status(200);
               if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
                 res.body.status.should.equal('We are open for business.');
               } else {
                 res.body.status.should.equal('Sorry, we are closed. Open daily from 6am to 8pm.');
               }
          //     res.body.length.should.be.eql(0);
             done();
           });
     });
 });
