
import { render, screen } from "@testing-library/react";
import Displayerror from "../Displayerror";
import "@testing-library/jest-dom";

describe("Displayerror Component", () => {
  it("renders without crashing", () => {
    render(<Displayerror />);
    // Check if the component renders
    expect(screen.getByText(/404 status code:/)).toBeInTheDocument();
  });

  it("displays the correct status code and message", () => {
    render(<Displayerror />);
    // Check for the status code
    const statusCode = screen.getByText(/404 status code:/);
    expect(statusCode).toBeInTheDocument();
    expect(statusCode).toHaveClass("text-rose-700"); // Check for the specific class

    // Check for the error message
    const errorMessage = screen.getByText(
      /The Page you are looking for was not found/
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("applies the correct styles", () => {
    render(<Displayerror />);
    const container = screen.getByRole("heading").parentElement; // Get the parent div of the heading
    expect(container).toHaveClass("grid"); // Check for grid layout
    expect(container).toHaveClass("h-screen"); // Check for full height
    expect(container).toHaveClass("place-items-center"); // Check for centered content
  });
});
