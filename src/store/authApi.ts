import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

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
        } catch (error: any) {
          return { error: { message: error.message } };
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
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: undefined };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
    }),
    // getCurrentUser: builder.query<User | null, void>({
    //   queryFn: () => {
    //     return new Promise((resolve) => {
    //       const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         resolve({ data: user });
    //         unsubscribe();
    //       });
    //     });
    //   },
    // }),
  }),
});

export const { useLoginMutation, useLogoutMutation,useSignupMutation } =
  authApi;
