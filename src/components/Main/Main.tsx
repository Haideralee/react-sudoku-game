import React, { useEffect, useState } from "react";
import Row from "components/Row/Row";
import { GetPreFillColumn, SolveSudoku } from "utils/axios";
import { POSSIBLE_NUMBERS } from "utils/constant";
import { ISudoku, ISudokuColumn } from "interfaces/sudoku.interface";
import {
  generateSolvePuzzlePayload,
  generateSudoku,
  solveSudokuGrid,
  updateValue,
  validateValue,
} from "utils/helper";

const Main: React.FC = () => {
  const [sudoku, setSudoku] = useState<Array<ISudoku>>([]);
  const [level, setLevel] = useState<string>("easy");

  const updateSudoku = (updatedSudoku: ISudoku[]) => {
    setSudoku(updatedSudoku);
  };

  useEffect(() => {
    getGenerateColumns();
    return () => {};
  }, [level]);

  const reset = () => {
    let initialSudoku: ISudoku[] = generateSudoku();
    updateSudoku(initialSudoku);
  };

  const handleInput = (e: any, sudokuChild: ISudokuColumn) => {
    const inputValue: string = isNaN(e.target.value) ? "" : e.target.value;
    sudokuChild.invalid = false;

    if (
      inputValue.length === 1 &&
      POSSIBLE_NUMBERS.includes(Number(inputValue))
    ) {
      validateValue({
        sudoku,
        sudokuChild,
        inputValue,
      });

      const updatedSudoku: ISudoku[] = updateValue({
        sudoku,
        sudokuChild,
        inputValue,
      });

      updateSudoku(updatedSudoku);
    } else if (!inputValue.length) {
      const updatedSudoku: ISudoku[] = updateValue({
        sudoku,
        sudokuChild,
        inputValue,
      });

      updateSudoku(updatedSudoku);
    }
  };

  const selectOptionChange = (event: any) => {
    setLevel(event.target.value);
  };

  const getGenerateColumns = async () => {
    try {
      const result = await GetPreFillColumn({ level });
      const updatedSudoku = sudoku.map((sd) => {
        return {
          ...sd,
          children: sd.children.map((child) => {
            return {
              ...child,
              value: result.puzzle[child.id] ? result.puzzle[child.id] : "",
            };
          }),
        };
      });
      updateSudoku(updatedSudoku);
    } catch (error) {}
  };

  const solvePuzzle = async () => {
    const payload: any[] = generateSolvePuzzlePayload(sudoku);
    const solvedSudoku: any = await SolveSudoku({ sudokuGrid: payload });
    const updatedSudoku = solveSudokuGrid({
      sudoku,
      solvedSudoku: solvedSudoku.solution,
    });

    updateSudoku(updatedSudoku);
  };

  const renderRow = () => {
    return sudoku.map((sudokuRow) => (
      <Row key={sudokuRow.id} sudokuRow={sudokuRow} handleInput={handleInput} />
    ));
  };

  if (!sudoku.length) {
    reset();
  }

  //   console.log("sudoku :: ", sudoku);

  return (
    <div className="sudoku-container">
      <div className="heading-container">
        <h1>Sudoku Game</h1>
      </div>
      <div className="body-container">
        <fieldset>
          <legend>Game Options</legend>
          <div className="level-and-buttons-container">
            <div className="levels">
              <label htmlFor="level"> Difficulty : </label>
              <select
                data-testid="difficulty-select"
                id="level"
                value={level}
                onChange={selectOptionChange}
              >
                <option data-testid="difficulty-option" value="easy">
                  Easy
                </option>
                <option data-testid="difficulty-option" value="medium">
                  Medium
                </option>
                <option data-testid="difficulty-option" value="hard">
                  Hard
                </option>
              </select>
            </div>

            <div className="refresh">
              <button
                className="btn btn-refresh"
                type="button"
                onClick={getGenerateColumns}
              >
                Refresh Puzzle
              </button>
            </div>

            <div className="reset">
              <button className="btn btn-reset" type="button" onClick={reset}>
                Reset Puzzle
              </button>
            </div>

            <div className="solve">
              <button
                className="btn btn-solve"
                type="button"
                onClick={solvePuzzle}
              >
                Solve Puzzle
              </button>
            </div>
          </div>
        </fieldset>

        <br />

        <div className="rows-container">{sudoku.length ? renderRow() : ""}</div>
      </div>
    </div>
  );
};

export default Main;
