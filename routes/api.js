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

    });
    
  app.route('/api/solve')
    .post((req, res) => {

      const { puzzle } = req.body;

      if (solver.validate(puzzle)) {
        return res.json(solver.validate(puzzle));
      }

    });
};
