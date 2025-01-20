import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { RingLoader } from "react-spinners";
import Movieinformation from "../components/Movieinformation";
import { useGetSingleMovieQuery } from "../store/apiSlice";

export interface SingleMovie {
  backdrop_path: string;
  title: string;
  utcDate: string;
  runtime: number;
  overview: string;
  vote_average: number;
}


const   Singlemovie = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const id = movieId ? parseInt(movieId, 10) : undefined;
  const {isLoading,error} = useGetSingleMovieQuery(id)

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <RingLoader color="#ee0dbd" size={25} />
      </div>
    );
  }

  return (
    <div className="bg-white h-screen flex gap-5">
      <Sidebar />

      {error? (
        <div className="grid h-screen w-full place-items-center">
          <p className="font-bold text-2xl text-gray-600">
            Oops.. Something went wrong, unable to fetch data
          </p>
        </div>
      ) : (
        <Movieinformation
        />
      )}
    </div>
  );
};

export default Singlemovie;
