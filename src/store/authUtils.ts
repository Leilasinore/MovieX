 import {  User } from "firebase/auth";
export const saveUserToLocalStorage = (user: User) => {

   const userToken = JSON.stringify({
     token:user.refreshToken,
     email:user.email
   })
   localStorage.setItem("user",userToken);
};


export const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? (JSON.parse(user) as User) : null;
};

// Clear user info from localStorage on logout
export const clearUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
