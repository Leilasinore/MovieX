import {
  saveUserToLocalStorage,
  getUserFromLocalStorage,
  clearUserFromLocalStorage,
} from "../authUtils"; // Update with the correct path
import { User } from "firebase/auth";

describe("LocalStorage User Functions", () => {
  const mockUser: Partial<User> = {
    refreshToken: "mock-refresh-token",
    email: "test@example.com",
  };

  afterEach(() => {
    // Clear localStorage between tests to avoid conflicts
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test("saveUserToLocalStorage should save user data correctly", () => {
    saveUserToLocalStorage(mockUser as User);

    const storedUser = localStorage.getItem("user");
    expect(storedUser).not.toBeNull();
    expect(JSON.parse(storedUser as string)).toEqual({
      token: mockUser.refreshToken,
      email: mockUser.email,
    });
  });

  test("getUserFromLocalStorage should return the correct user data", () => {
    // Save mock user first
    localStorage.setItem(
      "user",
      JSON.stringify({ token: mockUser.refreshToken, email: mockUser.email })
    );

    const retrievedUser = getUserFromLocalStorage();
    expect(retrievedUser).toEqual({
      token: mockUser.refreshToken,
      email: mockUser.email,
    });
  });

  test("getUserFromLocalStorage should return null if no user is stored", () => {
    expect(getUserFromLocalStorage()).toBeNull();
  });

  test("clearUserFromLocalStorage should remove user data", () => {
    // Save mock user first
    saveUserToLocalStorage(mockUser as User);
    expect(localStorage.getItem("user")).not.toBeNull();

    // Clear user data
    clearUserFromLocalStorage();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
