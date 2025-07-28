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

  test('Valid row placement', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isTrue(solver.checkRowPlacement(puzzle, 0, 0, '7'));
    done();
  });

  test('Invalid row placement', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.checkRowPlacement(puzzle, 0, 0, '9'));
    done();
  });

  test('Valid column placement', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isTrue(solver.checkColPlacement(puzzle, 0, 0, '3'));
    done();
  });

  test('Invalid column placement', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.checkColPlacement(puzzle, 0, 0, '8'));
    done();
  });

  test('Valid region placement', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isTrue(solver.checkRegionPlacement(puzzle, 0, 1, '6'));
    done();
  });

  test('Invalid region placement', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.checkColPlacement(puzzle, 0, 1, '2'));
    done();
  });

  test('Valid puzzle', (done) => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(/^\d+/.test(Number(solver.solve(puzzle))));
    done();
  });

  test('Invalid puzzle', (done) => {
    const puzzle = '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isFalse(/^\d+/.test(Number(solver.solve(puzzle))));
    done();
  });

  test('Solved puzzle', (done) => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    const solved = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
    assert.isTrue(solver.solve(puzzle) === solved);
    done();
  });

});
