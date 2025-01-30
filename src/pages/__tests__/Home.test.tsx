
import { render, screen } from "@testing-library/react";
import Home from "../Home";
import { useGetPopularMoviesQuery } from "../../store/apiSlice";
import "@testing-library/jest-dom";

// Mock child components
jest.mock("../../components/Headersection", () => () => <div>Headersection</div>);
jest.mock("../../components/Featured", () => () => <div>Featured</div>);
jest.mock("../../components/Footersection", () => () => <div>Footersection</div>);
jest.mock("../../store/apiSlice", () => ({
  useGetPopularMoviesQuery: jest.fn(),
}));

describe("Home Component", () => {
  const mockData = [
    { id: 1, title: "Movie 1" },
    { id: 2, title: "Movie 2" },
  ];
  const mockError = { message: "An error occurred", statusCode: 500 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Headersection, Featured, and Footersection components", () => {
    // Mock the API hook to return no data, no error, and not loading
    (useGetPopularMoviesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });

    render(<Home />);

    // Check if all child components are rendered
    expect(screen.getByText("Headersection")).toBeInTheDocument();
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByText("Footersection")).toBeInTheDocument();
  });

  it("passes isLoading prop to Featured component when API is loading", () => {
    // Mock the API hook to return loading state
    (useGetPopularMoviesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(<Home />);

    // Check if the Featured component is rendered with isLoading prop
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("passes errors prop to Featured component when API returns an error", () => {
    // Mock the API hook to return an error
    (useGetPopularMoviesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
    });

    render(<Home />);

    // Check if the Featured component is rendered with errors prop
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("passes movies prop to Featured component when API returns data", () => {
    // Mock the API hook to return data
    (useGetPopularMoviesQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
    });

    render(<Home />);

    // Check if the Featured component is rendered with movies prop
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });
});
