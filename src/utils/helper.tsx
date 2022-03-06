import {
  ISudoku,
  ISudokuColumn,
  IGenerateSudokuColumns,
  IValidateAndUpdateValue,
} from "interfaces/sudoku.interface";
import { BLOCKS } from "./constant";

export const generateSudoku = () => {
  const rows = "abcdefghi".toLocaleUpperCase().split("");
  const sudoku = rows.map((value, index) => {
    const id: string = `row-${index + 1}`;
    const family: string = value;
    const rowIndex: number = index;
    return {
      id,
      family,
      rowIndex,
      children: generateSudokuColumns({ id, family, rowIndex }),
    };
  });

  return sudoku;
};

const generateSudokuColumns = ({
  id,
  family,
  rowIndex,
}: IGenerateSudokuColumns) => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((val, index) => {
    return {
      rowIndex,
      value: "",
      parentId: id,
      invalid: false,
      columnIndex: index,
      id: `${family}${val}`,
    };
  });
};

export const validateValue = ({
  sudoku,
  sudokuChild,
  inputValue,
}: IValidateAndUpdateValue): void => {

  // validate block
  validateBlock({
    sudoku,
    sudokuChild,
    inputValue,
  });

  // validate row and columns
  validateRowAndColumn({
    sudoku,
    sudokuChild,
    inputValue,
  });
};

export const validateBlock = ({
  sudoku,
  sudokuChild,
  inputValue,
}: IValidateAndUpdateValue) => {
  const findRelatedBlock = BLOCKS.find(
    (block) =>
      block.row.includes(sudokuChild.id[0]) &&
      block.col.includes(sudokuChild.columnIndex + 1)
  );
  const findBlockRows = sudoku.filter((sd) =>
    findRelatedBlock?.row.includes(sd.family)
  );

  findBlockRows.forEach((row) => {
    const { children } = row;
    for (let i = 0; i < children.length; i++) {
      const colIndex = children[i].columnIndex + 1;
      if (
        findRelatedBlock?.col.includes(colIndex) &&
        inputValue.length &&
        children[i].value === inputValue
      ) {
        sudokuChild.invalid = true;
      }
    }
  });
};

export const validateRowAndColumn = ({
  sudoku,
  sudokuChild,
  inputValue,
}: IValidateAndUpdateValue): void => {
  for (let i = 0; i < sudoku.length; i++) {
    if (sudokuChild.rowIndex === i) {
      // validate current value with relative row
      sudoku[i].children.forEach((child) => {
        if (inputValue.length && child.value === inputValue) {
          sudokuChild.invalid = true;
        }
      });
    } else {
      // validate current value with relative column
      const relatedColumn: ISudokuColumn =
        sudoku[i].children[sudokuChild.columnIndex];
      if (inputValue.length && relatedColumn.value === inputValue) {
        sudokuChild.invalid = true;
      }
    }
  }
};

export const updateValue = ({
  sudoku,
  sudokuChild,
  inputValue,
}: IValidateAndUpdateValue): ISudoku[] => {
  return sudoku.map((sudokuRow, rowIndex) => {
    return {
      ...sudokuRow,
      children: sudokuRow.children.map((sudokuCol, colIndex) => {
        if (sudokuChild.id === sudokuCol.id) {
          return {
            ...sudokuCol,
            invalid: sudokuChild.invalid,
            value: inputValue,
          };
        }
        return sudokuCol;
      }),
    };
  });
};

export const generateSolvePuzzlePayload = (sudoku: ISudoku[]) => {
  let payload: any[] = [];

  sudoku.forEach((sdRow) => {
    let row: any = [];
    sdRow.children.forEach((col) => {
      const val = (col.value as string).length ? Number(col.value) : 0;
      row.push(val);
    });
    payload.push(row);
  });

  return payload;
};

export const solveSudokuGrid = ({
  sudoku,
  solvedSudoku,
}: {
  sudoku: ISudoku[];
  solvedSudoku: any[];
}) => {
  return sudoku.map((row, rowIndex) => {
    return {
      ...row,
      children: row.children.map((col, colIndex) => {
        return {
          ...col,
          value: solvedSudoku[rowIndex][colIndex].toString(),
        };
      }),
    };
  });
};
