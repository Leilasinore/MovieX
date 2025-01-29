import  React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../store/authApi";
import { RootState } from "../store";
import { RingLoader } from "react-spinners";
import {toast} from "react-toastify"
import { useSelector } from "react-redux";
export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate()

  const [signup, {error, isSuccess,isLoading}] = useSignupMutation();
  const movieId = useSelector((state: RootState) => state.movieItemId.movieId);
  const targetMovieId = movieId ?? 1241982;

  const onSignUpHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== null && password !== null) {
      await signup({ email, password }).unwrap();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User registered successfully", {
        toastId: "success1",
      });
       navigate(`/movie/${targetMovieId}`);
    
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
         toast.error("an error during registration");
      console.log(error);
    }
  }, [error]);

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
              Create an account to get started
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
                  onClick={onSignUpHandle}
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-rose-700 rounded-xl text-white font-bold text-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <RingLoader className="text-rose-700" />
                      Registering...
                    </span>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-base">
                  Already have an account?
                </p>
                <button
                  className="ml-2 font-medium text-base text-violet-500"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
