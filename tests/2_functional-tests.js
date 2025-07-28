const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  test('POST /api/solve Solve a puzzle with valid puzzle string', function(done) {
    chai.request(server)
      .post( '/api/solve' )
      .send( {
        "puzzle": "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
      } )
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'solution');
        assert.isTrue(typeof Number(res.body.solution) === 'number');
        done();
      });
  });

  test('POST /api/solve Solve a puzzle with missing puzzle string', function(done) {
    chai.request(server)
      .post( '/api/solve' )
      .send( {
        "puzzle": "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      } )
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'solution');
        assert.isTrue(typeof Number(res.body.solution) === 'number');
        assert.isTrue(res.body.solution === '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        done();
      });
  });

  test('POST /api/solve Solve a puzzle with invalid characters', function(done) {
    chai.request(server)
      .post( '/api/solve' )
      .send( {
        "puzzle": "1x5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      } )
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.include(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });

  test('POST /api/solve Solve a puzzle with incorrect length', function(done) {
    chai.request(server)
      .post( '/api/solve' )
      .send( {
        "puzzle": "15..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      } )
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.include(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });

  test('POST /api/solve Solve a puzzle that cannot be solved', function(done) {
    chai.request(server)
      .post( '/api/solve' )
      .send( {
        "puzzle": "115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      } )
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.include(res.body.error, 'Puzzle cannot be solved');
        done();
      });
  });

  test('POST /api/check Check a puzzle placement with all fields', function(done) {
    chai.request(server)
      .post( '/api/check' )
      .send( {
        "puzzle": "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "coordinate": "I9",
        "value": 7
      } )
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'valid');
        assert.isTrue(res.body.valid);
        done();
      });
  });

  test('POST /api/check Check a puzzle placement with single placement conflict', function(done) {
    chai.request(server)
      .post( '/api/check' )
      .send( {
        "puzzle": "1.576.984946381257728459613694517832812936745357824196473298561581673429269145378",
        "coordinate": "A2",
        "value": "2"
      } )
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'valid');
        assert.isFalse(res.body.valid);
        assert.property(res.body, 'conflict');
        assert.include(res.body.conflict, 'column');
        done();
      });
  });

  test('POST /api/check Check a puzzle placement with multiple placement conflicts', function(done) {
    chai.request(server)
      .post( '/api/check' )
      .send( {
        "puzzle": "1.576.984946381257728459613694517832812936745357824196473298561581673429269145378",
        "coordinate": "A2",
        "value": "5"
      } )
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'valid');
        assert.isFalse(res.body.valid);
        assert.property(res.body, 'conflict');
        assert.include(res.body.conflict, 'region');
        assert.include(res.body.conflict, 'row');
        done();
      });
  });

  test('POST /api/check Check a puzzle placement with all placement conflicts', function(done) {
    chai.request(server)
      .post( '/api/check' )
      .send( {
        "puzzle": "1.576.984946381257728459613694517832812936745357824196473298561581673429269145378",
        "coordinate": "A2",
        "value": "7"
      } )
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'valid');
        assert.isFalse(res.body.valid);
        assert.property(res.body, 'conflict');
        assert.include(res.body.conflict, 'column');
        assert.include(res.body.conflict, 'region');
        assert.include(res.body.conflict, 'row');
        done();
      });
  });

});
