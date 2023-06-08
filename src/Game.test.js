import Game from "./Game";
import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
it("Show the correct image", () => {
  render(
    <BrowserRouter>
      <Game currentGame={"bee"} />
    </BrowserRouter>
  );
  const gameImage = screen.getByAltText("where's waldo");

  expect(gameImage).toHaveAttribute("src", "find-bee.png");
});
test("cursor is not displayed by default", () => {
  render(
    <BrowserRouter>
      <Game currentGame={"bee"} />
    </BrowserRouter>
  );

  expect(screen.getByTestId("custom-cursor")).toHaveClass("hidden");
});
it("Cursor is displayed on mouse enter and hidden on mouse leave", async () => {
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Game currentGame={"bee"} />
    </BrowserRouter>
  );
  await act(async () => {
    await user.hover(screen.getByTestId("game-img"));
  });
  expect(screen.getByTestId("custom-cursor")).not.toHaveClass("hidden");
  await act(async () => {
    await user.unhover(screen.getByTestId("game-img"));
  });
  expect(screen.getByTestId("custom-cursor")).toHaveClass("hidden");
});
