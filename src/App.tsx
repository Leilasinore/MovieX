import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Singlemovie from "./pages/Singlemovie";
import SearchResults from "./pages/SearchResults";
import Displayerror from "./pages/Displayerror";

function App() {


  return (
    <>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<Singlemovie />} />
        <Route path="/movie/search/:movieName" element={<SearchResults />} />
        <Route path="*" element={<Displayerror />} /> 
      </Routes>
    </>
  );
}

export default App
