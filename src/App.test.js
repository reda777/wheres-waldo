import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

beforeEach(() => {
  jest.spyOn(Math, "random").mockReturnValue(0.5);
});
afterEach(() => {
  jest.spyOn(Math, "random").mockRestore();
});
test("renders link to game page", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Where's/i);
  expect(linkElement).toBeInTheDocument();
});
test("render random text", () => {
  jest.useFakeTimers();
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  //initial value
  const linkElement = screen.getByText(/Where's/i);
  expect(linkElement).toHaveTextContent("Where's bee");
  //after random game
  act(() => jest.advanceTimersByTime(1000));
  const afterTimer = screen.getByText(/Where's/i);
  expect(afterTimer).toHaveTextContent("Where's lollipop");

  jest.clearAllTimers();
});
test("handleMouseEnter stops the interval", () => {
  jest.useFakeTimers();

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  //simulate mouse enter event
  fireEvent.mouseOver(screen.getByText(/Where's/));
  //fast forward timers by 32ms
  act(() => jest.advanceTimersByTime(32));
  //verify game text doesn't change
  const linkElement = screen.getByText(/Where's/i);
  expect(linkElement).toHaveTextContent("Where's bee");

  //fast forward timers by 32ms
  act(() => jest.advanceTimersByTime(32));
  //verify game text doesn't change
  const linkElement1 = screen.getByText(/Where's/i);
  expect(linkElement1).toHaveTextContent("Where's bee");
  jest.clearAllTimers();
});
test("handleMouseLeave restarts the interval", () => {
  jest.useFakeTimers();

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  //simulate mouse enter event
  fireEvent.mouseOver(screen.getByText(/Where's/));
  //fast forward timers by 32ms
  act(() => jest.advanceTimersByTime(32));
  //verify game text doesn't change
  const linkElement = screen.getByText(/Where's/i);
  expect(linkElement).toHaveTextContent("Where's bee");

  //fast forward timers by 100ms
  act(() => jest.advanceTimersByTime(100));
  //verify game text doesn't change
  const linkElement1 = screen.getByText(/Where's/i);
  expect(linkElement1).toHaveTextContent("Where's bee");
  //simulate mouse leave event
  fireEvent.mouseLeave(screen.getByText(/Where's/));
  //fast forward timers by 100ms
  act(() => jest.advanceTimersByTime(100));
  //verify game text doesn't change
  const linkElement2 = screen.getByText(/Where's/i);
  expect(linkElement2).toHaveTextContent("Where's lollipop");
  jest.clearAllTimers();
});
