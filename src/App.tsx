import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Singlemovie from "./pages/Singlemovie";

function App() {


  return (
    <>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<Singlemovie />} />
        {/* <Route path="/movie/search/:movieName" element={<Results />} />
        <Route path="*" element={<Displayerror />} /> */}
      </Routes>
    </>
  );
}

export default App
