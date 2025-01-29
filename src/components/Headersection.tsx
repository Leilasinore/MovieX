import { Link } from "react-router-dom";
import {  FaPlayCircle } from "react-icons/fa";
import imdb from "../assets/imdb.png";
import tomato from "../assets/tomato.png";
import tv from "../assets/tv.png";
import { url_Image } from "../Urlendpoint/Urlendpoint";
import Searchnav from "./Searchnav";
import { useGetSingleMovieQuery } from "../store/apiSlice";
import { setMovieItemId } from "../store/movieItemIdSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Headersection = () => {
  const { data } = useGetSingleMovieQuery(1241982);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const playTrailer = ()=>{
        dispatch(setMovieItemId(1241982));
        navigate(`/movie/${1241982}`)
  }
  
  return (
    <header>
      <div
        className="relative h-screen w-full bg-center bg-no-repeat bg-cover px-5 md:px-20 text-white mb-16 before:absolute before:h-screen before:bg-black/50 before:inset-0"
        style={{
          backgroundImage: `url(${url_Image}/original${data?.backdrop_path})`,
        }}
      >
        <div className="absolute w-[90dvw] flex flex-col md:flex-row gap-5 items-start md:items-center justify-between py-4 md:gap-20 z-10">
          <div>
            <Link
              className="flex items-center gap-2 md:gap-5 text-2xl font-bold"
              to="/"
            >
              <img src={tv} alt="logo" />
              MovieX
            </Link>
          </div>
          <Searchnav />
        </div>
        <div className="absolute bg-opacity-75 flex flex-col items-start justify-center h-screen mt-20 md:mt-0 max-w-sm">
          <h2 className="text-4xl md:text-5xl w-full tracking-wide mb-3 font-bold">
            {data?.title}
          </h2>
          <div className="flex items-center gap-10 mb-2">
            <div className="flex items-center gap-2">
              <img src={imdb} alt="imdb" />

              <p className="text-sm">
                {Math.floor((data?.vote_average ?? 0) * 10)}.0 / 100
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm">
              <img src={tomato} alt="rating" />
              <p>97%</p>
            </div>
          </div>
          <p className="font-medium mb-4">{data?.overview}</p>
          <button className="bg-rose-700 flex items-center gap-2 px-4 py-2 rounded-lg" onClick={playTrailer}>
            <FaPlayCircle />
            Watch Trailer
          </button>
        </div>
      </div>
    </header>
  );
};

export default Headersection;
