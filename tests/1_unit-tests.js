const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {

  test('Valid characters, length of 81', (done) => {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isTrue(solver.solve(puzzle).length === 81);
    done();
  });

  test('Invalid characters, not 1-9 or .', (done) => {
    const puzzle = 'x.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.property(solver.validate(puzzle), 'error');
    assert.isString(solver.validate(puzzle).error, 'Invalid characters in puzzle');
    done();
  });

  test('Invalid length', (done) => {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';
    assert.property(solver.validate(puzzle), 'error');
    assert.isString(solver.validate(puzzle).error, 'Expected puzzle length to be 81 characters long');
    done();
  });

});
