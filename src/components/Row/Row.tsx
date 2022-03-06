import React from "react";
import Column from "../Column/Column";
import { ISudoku, ISudokuColumn, IRowProps } from "interfaces/sudoku.interface";

const Row: React.FC<IRowProps> = ({ sudokuRow, handleInput }: IRowProps) => {
  const renderColumn = (sudokuRow: ISudoku) => {
    return sudokuRow.children.map((sudokuChild: ISudokuColumn) => (
      <Column key={sudokuChild.id} sudokuChild={sudokuChild} handleInput={handleInput} />
    ));
  };

  return (
    <div className={`rows ${sudokuRow.id}`}>
      {renderColumn(sudokuRow)}
    </div>
  );
};

export default Row;
