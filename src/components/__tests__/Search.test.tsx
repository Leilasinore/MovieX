
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";
import Searchnav from "../Searchnav";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
// Mock the navigate function
const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);



describe("Searchnav Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<Searchnav />);

    // Check if the input is rendered
    const inputElement = screen.getByPlaceholderText(
      "What do you want to watch?"
    );
    expect(inputElement).toBeInTheDocument();

    // Check if the search button is rendered
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("updates the input value when the user types", async () => {
    render(<Searchnav />);

    const inputElement = screen.getByPlaceholderText(
      "What do you want to watch?"
    );
    const user = userEvent.setup();

    // Simulate typing in the input
    await user.type(inputElement, "Avengers");

    // Check if the input value is updated
    expect(inputElement).toHaveValue("Avengers");
  });

 it("navigates to the correct URL and clears the input when the form is submitted", async () => {
   render(<Searchnav />);

   const inputElement = screen.getByPlaceholderText(
     "What do you want to watch?"
   );
   const formElement = screen.getByTestId("search-form"); // Query by test ID
   const user = userEvent.setup();

   // Simulate typing in the input
   await user.type(inputElement, "Avengers");

   // Simulate form submission
   fireEvent.submit(formElement);

   // Check if the navigate function was called with the correct URL
   expect(mockNavigate).toHaveBeenCalledWith("/movie/search/Avengers");

   // Check if the input value is cleared
   expect(inputElement).toHaveValue("");
 });
});
