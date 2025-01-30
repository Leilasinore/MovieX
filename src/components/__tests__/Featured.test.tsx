
import { render, screen } from "@testing-library/react";
import Featured from "../Featured";
import "@testing-library/jest-dom";

jest.mock("../Card", () => jest.fn(() => <div data-testid="movie-card"></div>));
jest.mock("react-spinners", () => ({
  RingLoader: jest.fn(() => <div data-testid="loading-spinner"></div>),
}));

describe("Featured Component", () => {
  const mockMovies = [
    {
      poster_path: "/path.jpg",
      title: "Sample Movie",
      release_date: "2023-01-01",
      id: 1,
      vote_average: 8.5,
    },
  ];

  it("renders the title correctly", () => {
    render(<Featured movies={mockMovies} errors={null} isLoading={false} />);
    expect(screen.getByText("Featured Movies")).toBeInTheDocument();
  });

  it("displays a loading spinner when isLoading is true", () => {
    render(<Featured movies={[]} errors={null} isLoading={true} />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("displays an error message when errors exist", () => {
    render(
      <Featured
        movies={[]}
        errors={{ message: "Error", statusCode: 500 }}
        isLoading={false}
      />
    );
    expect(
      screen.getByText("Fetching data was not successful")
    ).toBeInTheDocument();
  });

  it("renders movies when there are no errors", () => {
    render(<Featured movies={mockMovies} errors={null} isLoading={false} />);
    expect(screen.getByTestId("movie-card")).toBeInTheDocument();
  });

  it("does not render movies when errors exist", () => {
    render(
      <Featured
        movies={mockMovies}
        errors={{ message: "Error", statusCode: 500 }}
        isLoading={false}
      />
    );
    expect(screen.queryByTestId("movie-card")).not.toBeInTheDocument();
  });
});
