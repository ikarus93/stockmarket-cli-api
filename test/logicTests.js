const assert = require('assert'),
      request = require('../logic/request');
      
require('mocha-sinon'); //module to test console output with mocha
      
      

describe('Initializes request correctly', () => {
      it('Sets the stocksymbol argument as stocksymbol property in constructor', () => {
            let req = new request('test');
            assert.equal(req.sym, 'test', 'symbol property is test')
      })
      it('verifies correct date and marks incorrect date as false', () => {
            let req = new request('abc');
            let wrongDate = req.verifyDate('2019-98-02');
            let correctDate = req.verifyDate('2017-06-01');
            assert(correctDate, 'Returns true for correct date');
            assert.equal(wrongDate, false, 'Returns false for incorrect date')
      })
})

describe('Requests latest stock data correctly', () => {
      let req = new request('abc');
         it('Creates a correct url, runs the request and returns a json-parsed response', (done) => {
               req.makeRequest(null, null, null, (err, res) => {
             assert.equal(typeof res, 'object', 'Response is an object');
             assert.equal(res['Meta Data']['2. Symbol'], 'abc', 'Returns correct stock marker')
             done();
         })
      })
})

describe('Requests and parses intradaydata correctly', () => {
      let req = new request('abc');
         it('Creates a correct url, runs the request and returns a json-parsed response', (done) => {
               req.makeRequest(true, 60, null, (err, res) => {
               req.checkRequest(err, res, null, true);
         })
      })     
});

describe('Correct Console output', () => {
    
    beforeEach(function() {
    this.sinon.stub(console, 'log');
  });
  let req = new request('abc');

        it('should log closing data for abc stock to the console', (done) => {
            req.makeRequest(null, null, null, (err, res) => {
                req.checkRequest(err, res, null, false);
                assert(console.log.calledOnce);
                assert(console.log.calledWith(`            Information for "abc" on 2018-03-14:
                Open: 100.8800
                Close: 98.5800
                High: 101.1200 
                Low: 98.1510
                Volume: 1288173`));
            })
        })
})




