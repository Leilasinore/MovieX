//import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//import { my_KEY, searchMovieEndpoint } from "../Urlendpoint/Urlendpoint";
import { RingLoader } from "react-spinners";
import Card from "../components/Card";
import Searchnav from "../components/Searchnav";
//import { FaArrowLeft } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { useGetSearchMoviesQuery } from "../store/apiSlice";

const SearchResults = () => {
//   const [movie, setMovie] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState([]);
  
  const { movieName } = useParams();
  const {data,isLoading} = useGetSearchMoviesQuery(movieName)
  

//   const searchMovie = async () => {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`${searchMovieEndpoint}${movieName}&${my_KEY}`);
//       const data = await res.json();
//       setMovie(data.results);
//     } catch (error) {
//       setErrors(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     searchMovie();
//   }, [movieName]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full h-screen items-center justify-center">
          <RingLoader color="#f10fa6" />
        </div>
      ) :
       (
        <main>
          <section className="mb-2">
            <div className="border-b w-full py-2 px-10 mb-5 flex flex-col md:flex-row gap-3 justify-between">
              <Link
                className="font-bold text-lg text-gray-700 flex items-center gap-2"
                to="/"
              >
                <FaListUl size={16} />
                <span>Go Back</span>
              </Link>

              <Searchnav />
            </div>
            <h2 className="px-10 text-xl md:text-2xl">
              Search results for{" "}
              <span className="font-semibold text-gray-700">{movieName}</span>
            </h2>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:grid-cols-4 2xl:grid-cols-5 place-items-center">

            {!data?.length ? (
              <h2 className="font-semibold text-xl md:text-2xl text-gray-700 text-center mx-0">
                Sorry, <span className="font-bold">{movieName}</span> not found
              </h2>
            ) : (
              data.map(
                (item) => {
                  return (
                    <Card
                      key={item.id}
                      poster_path={item.poster_path}
                      title={item.title}
                      release_date={item.release_date}
                      vote_average={item.vote_average}
                      id={item.id}
                    />
                  );
                }
              )
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default SearchResults;
