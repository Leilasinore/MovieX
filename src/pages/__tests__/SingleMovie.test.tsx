
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Singlemovie from "../Singlemovie";
import { useGetSingleMovieQuery } from "../../store/apiSlice";

jest.mock("../../store/apiSlice", () => ({
  useGetSingleMovieQuery: jest.fn(),
}));

jest.mock("react-spinners", () => ({
  RingLoader: jest.fn(() => <div data-testid="loading-spinner"></div>),
}));

jest.mock("../../components/Sidebar", () =>
  jest.fn(() => <div data-testid="sidebar"></div>)
);
jest.mock("../../components/Movieinformation", () =>
  jest.fn(() => <div data-testid="movie-information"></div>)
);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ movieId: "1" })),
}));

describe("Singlemovie Component", () => {
  it("shows the loading spinner when loading", () => {
    (useGetSingleMovieQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <Singlemovie />
      </BrowserRouter>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders Sidebar and Movieinformation when there is no error", () => {
    (useGetSingleMovieQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <Singlemovie />
      </BrowserRouter>
    );

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("movie-information")).toBeInTheDocument();
  });

  it("displays an error message when fetching data fails", () => {
    (useGetSingleMovieQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: true,
    });

    render(
      <BrowserRouter>
        <Singlemovie />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Oops.. Something went wrong, unable to fetch data")
    ).toBeInTheDocument();
  });
});
