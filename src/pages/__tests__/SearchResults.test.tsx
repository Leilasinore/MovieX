import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchResults from "../SearchResults";
import "@testing-library/jest-dom";
import { useGetSearchMoviesQuery } from "../../store/apiSlice";

jest.mock("../../store/apiSlice", () => ({
  useGetSearchMoviesQuery: jest.fn(),
}));

jest.mock("../../components/Searchnav", () =>
  jest.fn(() => <div data-testid="search-nav"></div>)
);

jest.mock("../../components/Card", () =>
  jest.fn(({ title }) => <div data-testid="movie-card">{title}</div>)
);

jest.mock("react-spinners", () => ({
  RingLoader: jest.fn(() => <div data-testid="loading-spinner"></div>),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ movieName: "Inception" })),
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("SearchResults Component", () => {
  it("shows the loading spinner when data is loading", () => {
    (useGetSearchMoviesQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders search navigation and movie cards when data is available", () => {
    const mockMovies = [
      {
        id: 1,
        poster_path: "/path1.jpg",
        title: "Movie 1",
        release_date: "2023-01-01",
        vote_average: 8.5,
      },
      {
        id: 2,
        poster_path: "/path2.jpg",
        title: "Movie 2",
        release_date: "2023-02-01",
        vote_average: 7.9,
      },
    ];

    (useGetSearchMoviesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockMovies,
    });

    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    expect(screen.getByTestId("search-nav")).toBeInTheDocument();
    expect(screen.getAllByTestId("movie-card")).toHaveLength(2);
  });
});
