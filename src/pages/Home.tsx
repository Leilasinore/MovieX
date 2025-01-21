import Footersection from "../components/Footersection";
import Headersection from "../components/Headersection";
import Featured from "../components/Featured";
import { useGetPopularMoviesQuery } from "../store/apiSlice";

const Home = () => {
  
  const { data, error, isLoading } = useGetPopularMoviesQuery();
  return (
    <>
      <Headersection />
      <Featured movies={data || []} isLoading={isLoading} errors={error} />
      
      <Footersection />
    </>
  );
};

export default Home;
