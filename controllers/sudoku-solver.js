
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
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if ((r !== row || c !== column) && puzzleString[r * 9 + c] === value) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    const sudokuSolver = (puzzle) => {
      const emptyIndex = puzzle.indexOf('.');
      if (emptyIndex === -1) {
        return puzzle;
      }
  
      const row = Math.floor(emptyIndex / 9);
      const col = emptyIndex % 9;
  
      for (let value = 1; value <= 9; value++) {
        const stringValue = value.toString();
        if (
          this.checkRowPlacement(puzzle, row, col, stringValue) &&
          this.checkColPlacement(puzzle, row, col, stringValue) &&
          this.checkRegionPlacement(puzzle, row, col, stringValue)
        ) {
          const newPuzzle = puzzle.slice(0, emptyIndex) + stringValue + puzzle.slice(emptyIndex + 1);
          const solved = sudokuSolver(newPuzzle);
          if (solved) {
            return solved;
          }
        }
      }
      return null;
    };
  
    return sudokuSolver(puzzleString) || 'Puzzle cannot be solved';
  }
}

module.exports = SudokuSolver;

