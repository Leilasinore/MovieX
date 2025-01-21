import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const my_KEY = "3d762bfec75d79016622728f8d2b2bad";
import { SingleMovie } from "../pages/Singlemovie";
import { Recommendedmovie } from "../components/ReccomendedMovies";
import { Similarmovie } from "../components/SimilarMovies";

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
    // `${searchMovieEndpoint}${movieName}&${my_KEY}`
    // `https://api.themoviedb.org/3/search/movie?query=${movieName}api_key=${my_KEY}`
    getSearchMovies: builder.query<Movie[], string | void>({
      query: (movieName) => `search/movie?query=${movieName}api_key=${my_KEY}`,
      transformResponse: (response: { results: Movie[] }) => response.results,
      //keepUnusedDataFor: 300, // Cache data for 300 seconds (5 minutes)
      //refetchOnMountOrArgChange: true, // Refetch data every time the component mounts
    }),
  }),
});

export const { useGetPopularMoviesQuery,useGetSingleMovieQuery,useGetRecommenddedMoviesQuery,useGetSimilarMoviesQuery,useGetSearchMoviesQuery} = apiSlice;
