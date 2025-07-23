
class SudokuSolver {

  validate(puzzleString) {

    if (!puzzleString) {
      return { error: "Required field missing" };
    }

    if (/[^1-9.]/.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    }

    if (puzzleString.length !== 81) {
      return ({ error: 'Expected puzzle to be 81 characters long' });
    }

  }

  checkRowPlacement(puzzleString, row, column, value) {
    for (let c = 0; c < 9; c++) {
      if (c !== column && puzzleString[row * 9 + c] === value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let r = 0; r < 9; r++) {
      if (r !== row && puzzleString[r * 9 + column] === value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

