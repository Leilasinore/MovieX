import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Singlemovie from "./pages/Singlemovie";
import SearchResults from "./pages/SearchResults";
import Displayerror from "./pages/Displayerror";
import ProtectRoute from "./ProtectRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthListener from "./store/authListener";

function App() {


  return (
    <>
      <AuthListener>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/search/:movieName" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectRoute />}>
            <Route path="/movie/:movieId" element={<Singlemovie />} />
          </Route>
          <Route path="*" element={<Displayerror />} />
        </Routes>
      </AuthListener>
    </>
  );
}

export default App
