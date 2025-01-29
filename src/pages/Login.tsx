
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/authApi";
import {toast} from "react-toastify"
import { RingLoader } from "react-spinners";
import { useDispatch,useSelector } from "react-redux";
import { setUser } from "../store/authSlice";
import { FirebaseError } from "firebase/app";
import { RootState } from "../store";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading,isSuccess,data }] = useLoginMutation();
   const movieId = useSelector(
     (state:RootState) => state.movieItemId.movieId
   )
   const targetMovieId = movieId ?? 1241982;



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== null && password !== null) {
        try {
           await login({ email, password }).unwrap();
        } catch (error) {
          if (error instanceof FirebaseError) {
            toast.error(error.message, {
               toastId: "error1",
           });
          } else {
            toast.error("An unknown error occured")
            console.error("An unknown error Occurred:", error);
          }
        }
    }
  };
   
  useEffect(() => {
    if (isSuccess) {
         dispatch(setUser(data))
      toast.success("User logged in successfully", {
        toastId: "success1",
      });
      navigate(`/movie/${targetMovieId}`);
    }   
  }, [isSuccess]);

  
  return (
    <div className="   align-bottom w-full h-screen shadow-sm bg-cover bg-center bg-[url('../src/assets/movieposters.jpeg')]  ">
      <div className="absolute inset-0 bg-gradient-to-br from-black/100 to-transparent  ">
        <h1 className="text-white text-4xl font-sans">MovieX</h1>
        <div className="flex justify-center items-center h-screen">
          <div className=" w-11/12 max-w-[500px] max-h-[700px] px-10 py-10 rounded-3xl bg-white border-2 border-gray-100 ">
            <h1 className="text-5xl font-semibold">
              Get Access to unlimited Movies!
            </h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
              Already have an account? Login
            </p>
            <div className="mt-8">
              <div className="flex flex-col">
                <label className="text-lg font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  type={"password"}
                />
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  onClick={handleLogin}
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-rose-700 rounded-xl text-white font-bold text-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <RingLoader className="text-rose-700" />
                      Loading...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-base">
                  Don't have an account?Create one
                </p>
                <button
                  className="ml-2 font-medium text-base text-violet-500"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
