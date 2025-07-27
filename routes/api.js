'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

      const { puzzle, coordinate, value } = req.body;

      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if (!/^[A-I][1-9]$/.test(coordinate)) {
        return res.json({ error: 'Invalid coordinate' });
      }

      if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' });
      }

      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      if (/[^1-9.]/.test(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }

      const row = coordinate.charCodeAt(0) - 'A'.charCodeAt(0);
      const col = parseInt(coordinate[1]) - 1;

      if (puzzle[row * 9 + col] == value) {
        return res.json({ valid: true });
      }

      let conflicts = [];
      if (!solver.checkRowPlacement(puzzle, row, col, value)) conflicts.push('row');
      if (!solver.checkColPlacement(puzzle, row, col, value)) conflicts.push('column');
      if (!solver.checkRegionPlacement(puzzle, row, col, value)) conflicts.push('region');

      return res.json(conflicts.length ? { valid: false, conflict: conflicts } : { valid: true });

    });
    
  app.route('/api/solve')
    .post((req, res) => {

      const { puzzle } = req.body;

      if (solver.validate(puzzle)) {
        return res.json(solver.validate(puzzle));
      }

      const solution = solver.solve(puzzle);

      if (solution === 'Puzzle cannot be solved') {
        return res.json({ error: solution });
      } else {
          return res.json({solution: solution});
      }

    });
};
