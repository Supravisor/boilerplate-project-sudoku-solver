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

    });
    
  app.route('/api/solve')
    .post((req, res) => {

      const { puzzle } = req.body;

      if (solver.validate(puzzle)) {
        return res.json(solver.validate(puzzle));
      }

    });
};
