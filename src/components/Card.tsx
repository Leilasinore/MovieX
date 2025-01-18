import { url_Image } from "../Urlendpoint/Urlendpoint";
import imdb from "../assets/imdb.png";
import tomato from "../assets/tomato.png";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";

interface myCardProps {
    poster_path: string;
    title:string;
    release_date:string;
    id:number;
    vote_average:number;
}

const Card:React.FC<myCardProps> = ({ poster_path, title, release_date, id, vote_average }) => {
  const [clicked, setClicked] = useState(false);

  const handleClicked = () => {
    setClicked(!clicked);
  };

  const Date_in_UTC = new Date(release_date).toUTCString();

  return (
    <div
      data-testid="movie-card"
      className="overflow-hidden flex flex-col gap-3 relative"
    >
      <button
        className={`absolute z-20 p-3 rounded-full top-3 right-3 ${
          clicked ? "text-rose-600 bg-white/80" : "text-gray-300 bg-gray-100/40"
        }`}
        onClick={handleClicked}
      >
        <FaHeart />
      </button>
      <Link to={`/movie/${id}`} className="max-h-[28rem] w-[15.625rem]">
        <img
          className="h-[21.125rem] w-full hover:scale-105 transition-all duration-700 ease-in-out mb-2"
          data-testid="movie-poster"
          src={`${url_Image}/w500${poster_path}`}
          alt={title}
        />
        <h2
          className="text-xs font-semibold text-gray-400"
          data-testid="movie-release-date"
        >
          {Date_in_UTC}
        </h2>
        <h2
          data-testid="movie-title"
          className="font-bold text-gray-900 leading-6 text-lg"
        >
          {title}
        </h2>
        <div className="flex items-center justify-between">
          <h4 className="flex gap-2 items-center">
            <img src={imdb} alt="imdbImage" />
            <p className="text-gray-900 text-xs">
              {Math.floor(vote_average * 10)}.0 / 100
            </p>
          </h4>
          <h4 className="flex gap-1 items-center">
            <img src={tomato} alt="popularity" />
            <p className="text-gray-900 text-xs">80%</p>
          </h4>
        </div>

        <p className=" font-bold text-gray-400 text-xs ">Action, Adventure</p>
      </Link>
    </div>
  );
};

export default Card;
