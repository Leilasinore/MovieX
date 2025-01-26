
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

// Helper to serialize the Firebase User
const serializeUser = (user: User | null) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      { uid: string; email: string | null; displayName: string | null },
      { email: string; password: string }
    >({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = serializeUser(userCredential.user);
          return { data: user };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
    }),
    loginUser: builder.mutation<
      { uid: string; email: string | null; displayName: string | null },
      { email: string; password: string }
    >({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = serializeUser(userCredential.user);
          return { data: user };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: undefined };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
