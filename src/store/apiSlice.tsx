import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { my_KEY } from "../Urlendpoint/Urlendpoint";
import { SingleMovie } from "../pages/Singlemovie";
import { Recommendedmovie } from "../components/ReccomendedMovies";
import { Similarmovie } from "../components/SimilarMovies";
import { MovieVideo } from "../components/VideoPlayer";

export interface Movie {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  vote_average: number;
}



export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.themoviedb.org/3/`,
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<Movie[], void>({
      query: () => `movie/popular?api_key=${my_KEY}`,
      transformResponse: (response: { results: Movie[] }) =>
        response.results.slice(0, 10),
      keepUnusedDataFor: 300, // Cache data for 300 seconds (5 minutes)
      //refetchOnMountOrArgChange: true, // Refetch data every time the component mounts
    }),

    getSingleMovie: builder.query<SingleMovie, number | void>({
      query: (movieId) => `movie/${movieId}?api_key=${my_KEY}`,
    }),

    getRecommenddedMovies: builder.query<Recommendedmovie[], number | void>({
      query: (movieId) => `movie/${movieId}/recommendations?api_key=${my_KEY}`,
      transformResponse: (response: { results: Recommendedmovie[] }) =>
        response.results.slice(0, 3),
    }),

    getSimilarMovies: builder.query<Similarmovie[], number | void>({
      query: (movieId) => `movie/${movieId}/similar?api_key=${my_KEY}`,
      transformResponse: (response: { results: Similarmovie[] }) =>
        response.results.slice(0, 3),
    }),
    getSearchMovies: builder.query<Movie[], string | void>({
      query: (movieName) =>
        `search/movie?include_adult=false&language=en-US&page=1&api_key=${my_KEY}&query=${movieName}`,
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
    getMovieVideo: builder.query<MovieVideo[], number | void>({
      query: (movieId) => `movie/${movieId}/videos?api_key=${my_KEY}`,
      transformResponse: (response: { results: MovieVideo[] }) =>
        response.results.slice(0, 3),
    }),
  }),
});

export const { useGetPopularMoviesQuery,useGetSingleMovieQuery,useGetRecommenddedMoviesQuery,useGetSimilarMoviesQuery,useGetSearchMoviesQuery,useGetMovieVideoQuery} = apiSlice;
