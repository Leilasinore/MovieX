import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebaseConfig";
import { setUser, clearUser } from "./authSlice";
import { saveUserToLocalStorage, clearUserFromLocalStorage } from "./authUtils";

const AuthListener: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        saveUserToLocalStorage(user); // Save user to localStorage
      } else {
        dispatch(clearUser());
        clearUserFromLocalStorage();
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthListener;
