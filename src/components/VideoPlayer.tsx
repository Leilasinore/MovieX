
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useGetMovieVideoQuery } from "../store/apiSlice";
import { RingLoader } from "react-spinners";


export interface MovieVideo {
  id: number;
  key: string;
  name: string;
  site: string;
  type: string;
}

const VideoPlayer= ({
}) => {

  const { movieId } = useParams<{ movieId: string }>();
  const id = movieId ? parseInt(movieId, 10) : undefined;
  const {data,isLoading,error,isSuccess} = useGetMovieVideoQuery(id)
  

  let trailerUrl;
  const randomMovie = data ? data[0] : undefined;
  if (randomMovie?.site === "YouTube") {
    trailerUrl = `https://www.youtube.com/watch?v=${randomMovie.key}`;
  } else {
    trailerUrl = `https://vimeo.com/${randomMovie?.key}`;
  }
   if (isLoading) {
     return (
       <div className="flex w-full h-screen items-center justify-center">
         <RingLoader color="#ee0dbd" size={25} />
       </div>
     );
   }
   if (error){
      return(
         <div>An error occurred while fetching data</div>
      )   
   }

   if (isSuccess){
  return (   
    <ReactPlayer
      className="react-player"
      url={trailerUrl}
      playing
      controls={true}
      width="100%"
      height="100%"
    />
  );}
};

export default VideoPlayer;
