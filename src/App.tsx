import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Singlemovie from "./pages/Singlemovie";
import SearchResults from "./pages/SearchResults";
import Displayerror from "./pages/Displayerror";
import ProtectRoute from "./ProtectRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/search/:movieName" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route element={<ProtectRoute />}>
          <Route path="/movie/:movieId" element={<Singlemovie />} />
        </Route>
        <Route path="*" element={<Displayerror />} />
      </Routes>
    </>
  );
}

export default App
