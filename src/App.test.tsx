import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import List from "./components/list";

describe("App container", () => {
  test("renders the Trello | Clone link", () => {
    render(<App />);
    expect(screen.getByText("Trello | Clone")).toBeInTheDocument();
    expect(screen.getByText("Add a list")).toBeInTheDocument();
  });

  test('Clicking "Add a list" should change the button text to "Add list" & should render the textbox', () => {
    render(<App />);
    fireEvent.click(screen.getByText("Add a list"));
    expect(screen.getByText("Add List")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test('Adding a list with name "Test List" creates a list', () => {
    render(<App />);
    fireEvent.click(screen.getByText("Add a list"));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Test List" },
    });
    fireEvent.click(screen.getByText("Add List"));

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByText("Test List")).toBeInTheDocument();
  });
});
