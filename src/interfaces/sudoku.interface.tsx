export interface IGenerateSudokuColumns {
  id: string;
  rowIndex: number;
  family: string;
}

export interface ISudoku {
  id: string;
  family: string;
  rowIndex: number;
  children: ISudokuColumn[];
}

export interface ISudokuColumn {
  id: string;
  parentId: string;
  columnIndex: number;
  rowIndex: number;
  value: string | number;
  invalid: boolean;
}

export interface IValidateAndUpdateValue {
  sudoku: ISudoku[];
  sudokuChild: ISudokuColumn;
  inputValue: string;
}

export interface IRowProps {
  sudokuRow: ISudoku;
  handleInput: Function;
}

export interface IColumnProps {
  handleInput: Function;
  sudokuChild: ISudokuColumn;
}
