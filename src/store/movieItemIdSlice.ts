import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieId: null,
};

export const movieItemIdSlice = createSlice({
  name: "movieItemId",
  initialState,
  reducers: {
    setMovieItemId: (state, action) => {
      state.movieId = action.payload;
    },
  },
});

export const { setMovieItemId} = movieItemIdSlice.actions;

export default movieItemIdSlice.reducer;
