
export const my_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

export const moviesUrl = `https://api.themoviedb.org/3/movie/top_rated?${my_KEY}`;

export const singlemovieRoute = "https://api.themoviedb.org/3/movie";

export const searchMovieEndpoint =
  "https://api.themoviedb.org/3/search/movie?query=";

export const url_Image = "https://image.tmdb.org/t/p";
