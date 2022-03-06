import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import Main from "components/Main/Main";
import axios from "axios";

jest.mock("axios");
afterEach(cleanup);

const fakeData = {
  data: {
    difficulty: "medium",
    puzzle: {
      A1: "8",
      A6: "2",
      A7: "7",
      A8: "4",
      B1: "6",
      B6: "7",
      C3: "2",
      C6: "6",
      C9: "3",
      E1: "5",
      E3: "9",
      E8: "6",
      F3: "6",
      G2: "2",
      G4: "4",
      G9: "9",
      H3: "5",
      H4: "9",
      H9: "2",
      I3: "4",
      I6: "1",
      I7: "6",
      I9: "8",
      B7: "5",
      F5: "5",
      I5: "3",
      D2: "3",
      D1: "2",
    },
  },
};

// test case 1
test("renders Main Heading", () => {
  render(<Main />);
  const gameHeading = screen.getByText(/Sudoku Game/i);
  expect(gameHeading).toBeInTheDocument();
});

// test case 2
test("renders Difficultly options", async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    ...fakeData,
  });

  render(<Main />);

  const select: any = screen.getByTestId("difficulty-select");
  const options: any = screen.getAllByTestId("difficulty-option");

  fireEvent.change(select, {
    target: { value: "hard" },
  });

  await waitFor(() => expect(select.value).toEqual("hard"));
  await waitFor(() => expect(options.length).toEqual(3));
  await waitFor(() => expect(options[0].value).toEqual("easy"));
  await waitFor(() => expect(options[1].value).toEqual("medium"));
  await waitFor(() => expect(options[2].value).toEqual("hard"));
});
