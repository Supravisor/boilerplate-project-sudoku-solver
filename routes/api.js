'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

      if (/[^1-9.]/.test(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
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
