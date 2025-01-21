import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// interface Movie {
//   poster_path: string;
//   title: string;
//   release_date: string;
//   id: number;
//   vote_average: number;
// }

// interface myFeaturedProps {
//   movies: Movie[];
//   errors: any;
//   isLoading: boolean;
// }

const Searchnav = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSearchMovie = (e:any) => {
    e.preventDefault();
    navigate(`/movie/search/${value}`);
    setValue("");
  };
  return (
    <div className="w-full md:w-2/4 border-2 border-gray-300 rounded-lg p-2 relative">
      <form onSubmit={handleSearchMovie} className="w-full flex items-center">
        <input
          className="bg-transparent placeholder:text-gray-300 outline-none border-none focus:border-none w-full focus:text-gray-300 font-medium"
          type="text"
          id="search"
          placeholder="What do you want to watch?"
          name={value}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="absolute right-2 text-gray-300" type="submit">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Searchnav;
