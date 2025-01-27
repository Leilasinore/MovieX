import {  User } from "firebase/auth";

// Save user info in localStorage
export const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get user info from localStorage
export const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? (JSON.parse(user) as User) : null;
};

// Clear user info from localStorage on logout
export const clearUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
