
import { FaList, FaStar, FaTicketAlt } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useGetSingleMovieQuery } from "../store/apiSlice";
import ReccomendedMovies from "./ReccomendedMovies";
import SimilarMovies from "./SimilarMovies";
import VideoPlayer from "./VideoPlayer";

const Movieinformation = (
) => {
    const { movieId } = useParams<{ movieId: string }>();
   const id = movieId ? parseInt(movieId, 10) : undefined;
       const { data} = useGetSingleMovieQuery(id);
  return (
    <section className="mt-6 lg:mt-4 mx-9 flex-1">
      <div className="relative w-half flex items-center justify-center h-[17rem] sm:h-[17rem] md:h-[30rem]">
        <VideoPlayer
        />
      </div>

      <div className="text-lg font-medium text-[#404040] flex items-center justify-between my-3">
        <div className="flex flex-col lg:flex-row lg:items-center gap-1 md:gap-2 text-xl md:text-2xl">
          <h3 data-testid="movie-title">{data?.title}</h3>
          <BsDot className="hidden lg:block" size={30} />
          <h3
            className="text-xs sm:text-sm md:text-lg"
            data-testid="movie-release-date"
          >
            {data?.utcDate}
          </h3>
          <BsDot className="hidden lg:block" size={30} />
          <h3
            className="text-sm sm:text-base md:text-lg"
            data-testid="movie-runtime"
          >
            {data?.runtime}mins
          </h3>
        </div>
        <p className="flex items-center text-xs sm:text-sm md:text-lg">
          <FaStar className="text-yellow-300" />
          <span className="text-[#E8E8E8] mx-1">{data?.vote_average}</span>|
          250K
        </p>
      </div>
      <div className="flex flex-col gap-4 xl:flex-row text-lg md:text-xl font-normal text-[#333]">
        <div className="mb-3 md:mb-0 text-sm sm:text-base md:text-lg">
          <p
            data-testid="movie-overview"
            className="lg:max-w-[44rem] leading-6"
          >
            {data?.overview}
          </p>

          <div className="mt-3 mb-3">
            <h3 className="mb-3">
              Director: <span className="text-rose-700">John Doe</span>
            </h3>
            <h3 className="mb-3">
              Writers:{" "}
              <span className="text-rose-700">John Doe, Jane Doe, Foo Bar</span>
            </h3>
            <h3>
              Stars:{" "}
              <span className="text-rose-700">John Doe, Jane Doe, Foo Bar</span>
            </h3>
          </div>
          <h2>Similar movies</h2>
          <ReccomendedMovies />
        </div>

        <div className="flex-1 flex flex-col justify-between lg:justify-normal gap-3 md:text-lg mb-2 md:mb-0 ">
          <div className="flex flex-col gap-3">
            <button className="bg-rose-700 px-6 py-2 rounded-lg text-white flex items-center gap-2 md:gap-3 font-medium text-sm sm:text-base">
              <FaTicketAlt className=" -rotate-45" />
              See Showtime
            </button>
            <button className="bg-rose-100 px-5 py-3 rounded-lg text-[#333] border border-rose-700 flex items-center gap-2 sm:gap-3 text-sm sm:text-base leading-4 font-bold">
              <FaList />
              More watch options
            </button>
          </div>
          <SimilarMovies />
        </div>
      </div>
    </section>
  );
};

export default Movieinformation;
