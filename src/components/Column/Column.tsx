import React from "react";
import { IColumnProps } from "interfaces/sudoku.interface";

const Column: React.FC<IColumnProps> = ({
  sudokuChild,
  handleInput,
}: IColumnProps) => {
  return (
    <input
      name={`${sudokuChild.parentId}-${sudokuChild.id}`}
      onChange={(e) => handleInput(e, sudokuChild)}
      className={`columns ${sudokuChild.id} ${
        sudokuChild.invalid ? "invalid" : ""
      }`}
      value={sudokuChild.value}
      type="text"
      autoComplete="off"
    />
  );
};

export default Column;
