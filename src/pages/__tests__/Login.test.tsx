
import { render, screen, waitFor } from "@testing-library/react";
import Login from "../Login";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setUser } from "../../store/authSlice";
import { useLoginMutation } from "../../store/authApi";
import { toast } from "react-toastify";
import { MemoryRouter, useNavigate } from "react-router-dom";

// Mock the useLoginMutation hook
jest.mock("../../store/authApi", () => ({
  useLoginMutation: jest.fn(),
}));

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    movieItemId: () => ({ movieId: 1241982 }), // Mock movieId
  },
});

describe("Login Component", () => {
  const mockNavigate = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      { isLoading: false, isSuccess: false, data: null },
    ]);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading state during login", () => {
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      { isLoading: true, isSuccess: false, data: null },
    ]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("navigates to movie page on successful login", async () => {
    mockLogin.mockResolvedValueOnce({ data: { user: "testUser" } });
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      { isLoading: false, isSuccess: true, data: { user: "testUser" } },
    ]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/movie/1241982");
    });
    expect(toast.success).toHaveBeenCalledWith("User logged in successfully", {
      toastId: "success1",
    });
  });
});

