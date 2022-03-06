import axios from "axios";
// axios.defaults.baseURL = "https://vast-chamber-17969.herokuapp.com/";

export const GetPreFillColumn = async ({
  level,
}: {
  level: string;
}): Promise<any> => {
  try {
    const result: any = await axios.get(
      `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${level}`
    );
    return result.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const SolveSudoku = async ({
  sudokuGrid,
}: {
  sudokuGrid: any[];
}): Promise<any> => {
  try {
    const result: any = await axios.post(`https://sugoku.herokuapp.com/solve`, {
      board: sudokuGrid,
    });
    return result.data;
  } catch (error: any) {
    throw Error(error);
  }
};
