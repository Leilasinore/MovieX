import { url_Image } from "../Urlendpoint/Urlendpoint";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetRecommenddedMoviesQuery } from "../store/apiSlice";
import { RingLoader } from "react-spinners";
export interface Recommendedmovie {
    id:number,
    title:string,
    poster_path:string
}

const ReccomendedMovies = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const id = movieId ? parseInt(movieId, 10) : undefined;
    const {data,isLoading,error} = useGetRecommenddedMoviesQuery(id)
  return (
    <div className="flex flex-row gap-5  sm:flex-row md:m-4 ">
      {isLoading ? (
        <div className="flex  items-center justify-center">
          <RingLoader color="#ee0ac0" />
        </div>
      ) : error ? (
        <div>
          <p className="text-center font-bold text-xl text-gray-700 w-full">
            Fetching data was not successful
          </p>
        </div>
      ) : (
        data?.map((item) => {
          return (
            <Link to={`/movie/${item.id}`}>
              <img
                className="w-[120px] rounded-[20px] h-[200px] md:w-[173px] md:h-[271px] hover:scale-105 transition-all duration-700 ease-in-out mb-2"
                data-testid="movie-poster"
                src={`${url_Image}/w500${item.poster_path}`}
                alt={item.title}
              />
            </Link>
          );
        })
      )}
    </div>
  );
}

export default ReccomendedMovies
