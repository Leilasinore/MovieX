import Footersection from "../components/Footersection";
import Headersection from "../components/Headersection";
import Featured from "../components/Featured";
import { useEffect, useState } from "react";
import { moviesUrl } from "../Urlendpoint/Urlendpoint";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(moviesUrl);
      const data = await res.json();
      const firstTen = data.results.slice(0, 10);
      setMovies(firstTen);
    } catch (error:any) {
      setErrors(error.stack);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <>
      <Headersection />
      <Featured movies={movies} isLoading={isLoading} errors={errors} />
      <Footersection />
    </>
  );
};

export default Home;
