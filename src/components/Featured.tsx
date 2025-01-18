import Card from "./Card";
import { RingLoader } from "react-spinners";

interface Movie {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  vote_average: number;
}

interface myFeaturedProps{
    movies:Movie[];
    errors:{}[];
    isLoading:boolean;
}

const Featured:React.FC<myFeaturedProps> = ({ movies, errors, isLoading }) => {
  return (
    <main className="px-10 md:px-20 mb-36">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between mb-11 items-start md:items-center">
        <h1 className="font-bold text-3xl">Featured Movie</h1>
        <button className="text-rose-700 font-semibold">
          See more <span>&gt;</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <RingLoader color="#ee0ac0" />
        </div>
      ) : (
        <section
          className={`${
            !errors.length
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 place-items-center"
              : "grid"
          }`}
        >
          {errors.length ? (
            <div>
              <p className="text-center font-bold text-xl text-gray-700 w-full">
                Fetching data was not successful
              </p>
            </div>
          ) : (
            movies.map(
              ({ poster_path, title, release_date, id, vote_average }) => {
                return (
                  <Card
                    key={id}
                    poster_path={poster_path}
                    title={title}
                    release_date={release_date}
                    vote_average={vote_average}
                    id={id}
                  />
                );
              }
            )
          )}
        </section>
      )}
    </main>
  );
};

export default Featured;
