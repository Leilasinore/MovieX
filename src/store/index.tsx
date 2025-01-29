import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { authApi } from "./authApi";
import authReducer from "./authSlice"
import moviItemIdReducer from "./movieItemIdSlice"


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    movieItemId: moviItemIdReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
