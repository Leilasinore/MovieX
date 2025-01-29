import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<User, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          return { data: userCredential.user };
        } catch (error) {
          if (error instanceof FirebaseError) {
            return { error: { message: error.message } };
          } else {
            return {"Unexpected Error:":error}
          }
        }
      },
    }),
    signup: builder.mutation<User, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          return { data: userCredential.user };
        } catch (error) {
          if (error instanceof FirebaseError) {
            return { error: { message: error.message } };
          } else {
            return { "Unexpected Error:": error };
          }
        }
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: undefined };
        } catch (error) {
          if (error instanceof FirebaseError) {
            return { error: { message: error.message } };
          } else {
            return { "Unexpected Error:": error };
          }
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation,useSignupMutation } =
  authApi;
