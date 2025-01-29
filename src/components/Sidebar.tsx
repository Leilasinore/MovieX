import { Link } from "react-router-dom";
import tv from "../assets/tv.png";
import { BiHome } from "react-icons/bi";
import { BiSolidCameraMovie } from "react-icons/bi";
import { PiVideo } from "react-icons/pi";
import { LiaCalendarSolid } from "react-icons/lia";
import { TbLogout2 } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLogoutMutation,} from "../store/authApi";
import { getUserFromLocalStorage } from "../store/authUtils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {toast} from "react-toastify"
import { RingLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setMovieItemId } from "../store/movieItemIdSlice";

const Sidebar = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [logout,{isSuccess,isLoading} ] = useLogoutMutation();
  const data= getUserFromLocalStorage()


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navigation = [
    {
      title: "Home",
      link: "/",
      icon: <BiHome />,
      active: false,
    },
    {
      title: "Movies",
      link: "/movies/:movieId",
      icon: <BiSolidCameraMovie />,
      active: true,
    },
    {
      title: "TV Series",
      icon: <PiVideo />,
      active: false,
    },
    {
      title: "Upcoming",
      icon: <LiaCalendarSolid />,
      active: false,
    },
  ];

  const openMenu = () => {
    setOpenSideBar(!openSideBar);
  };
  const signOutUser = async() =>{
       await logout();
       
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("User logged out successfully", {
        toastId: "success1",
      });
      navigate("/");
      dispatch(setMovieItemId(null));
    }
    // eslint-disable-next-line
  }, [isSuccess]);
  

  return (
    <>
      <aside className="hidden lg:flex lg:flex-col gap-2 border rounded-r-[2.8rem] sticky z-10 top-0 left-0 h-screen bg-white shadow-md">
        <div className="pt-10 px-4">
          <Link
            className="flex items-center gap-2 md:gap-5 text-xl font-bold"
            to="/"
          >
            <img src={tv} alt="moviebox" className="h-12" />
            MovieX
          </Link>
        </div>
        <nav className="flex flex-col w-full xl:mb-5">
          {navigation.map(({ icon, title, link, active }) => {
            return (
              <Link
                key={title}
                to={link || "/default-route"}
                className={`flex items-center gap-2 py-5 px-6 text-gray-600 text-base hover:border-r-4 hover:border-rose-700 hover:bg-rose-100 duration-300 ${
                  active && "border-r-4 border-rose-700 bg-rose-100"
                }`}
              >
                {icon}
                <span className={`${active && "text-rose-700"} font-bold`}>
                  {title}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="bg-rose-50 border border-rose-400 rounded-[1.25rem] p-2 w-40 h-48 mx-6 xl:mb-7">
          <p className=" mt-8 mb-2 text-sm font-semibold text-gray-700 px-2">
            Play movie quizes and earn <br /> free tickets
          </p>
          <p className="text-[0.7rem] font-medium text-[#666] px-2 mb-2">
            50k people are playing now
          </p>
          <button className="text-rose-700 bg-rose-200 text-xs font-medium border-rose-700 px-2 py-1 rounded-full mx-6">
            Start playing
          </button>
        </div>

        <button
          className="flex items-center gap-2 mx-11 text-gray-600 text-base font-bold"
          onClick={signOutUser}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <RingLoader className="text-rose-700" />
              Logging out..
            </span>
          ) : (
            <>
              <TbLogout2 size={18} />
              <span>Log Out</span>
            </>
          )}
        </button>
        <span className="flex items-center gap-2 mx-11 mt-10 text-gray-600 text-base font-bold">
          <VscAccount size={18} />
          <span>{data?.email}</span>
        </span>
      </aside>

      <aside
        className={`block lg:hidden border rounded-r-[2.8rem] fixed lg:relative h-screen z-10 bg-white shadow-md transition-all duration-300 ease-in-out lg:left-0 ${
          openSideBar ? "left-0 opacity-100" : "left-[-100%] opacity-0"
        }`}
      >
        <div className="mb-7 pt-10 px-4">
          <Link
            className="flex items-center gap-2 md:gap-5 text-xl font-bold"
            to="/"
          >
            <img src={tv} alt="logo" className="h-10" />
            MovieX
          </Link>
        </div>
        <nav className="flex flex-col w-full mb-5">
          {navigation.map(({ icon, title, link, active }) => {
            return (
              <Link
                key={title}
                to={link || "/default-route"}
                className={`flex items-center gap-2 py-5 px-6 text-gray-600 text-base hover:border-r-4 hover:border-rose-700 hover:bg-rose-100 duration-300 ${
                  active && "border-r-4 border-rose-700 bg-rose-100"
                }`}
              >
                {icon}
                <span className={`${active && "text-rose-700"} font-bold`}>
                  {title}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="bg-rose-50 border border-rose-400 rounded-[1.25rem] p-2 w-40 h-48 mx-6 mb-10">
          <p className=" mt-8 mb-2 text-sm font-semibold text-gray-700 px-2">
            Play movie quizes and earn <br /> free tickets
          </p>
          <p className="text-[0.7rem] font-medium text-[#666] px-2 mb-2">
            50k people are playing now
          </p>
          <button className="text-rose-700 bg-rose-200 text-xs font-medium border-rose-700 px-2 py-1 rounded-full mx-6">
            Start playing
          </button>
        </div>

        <button
          className="flex items-center gap-2 mx-11 text-gray-600 text-base font-bold"
          onClick={signOutUser}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <RingLoader className="text-rose-700" />
              Logging out..
            </span>
          ) : (
            <>
              <TbLogout size={18} />
              <span>Log Out</span>
            </>
          )}
        </button>
        <span className="flex items-center gap-2 mx-11 mt-10 text-gray-600 text-base font-bold">
          <VscAccount size={18} />
          <span>{data?.email}</span>
        </span>
      </aside>
      <button
        onClick={openMenu}
        className={`fixed lg:hidden z-[9] cursor-pointer duration-300 ease-in-out ${
          openSideBar ? "left-[13rem]" : "left-1"
        } top-12`}
      >
        {openSideBar ? (
          <FaChevronLeft className="bg-rose-700 h-7 md:h-8 w-7 md:w-8 rounded-full p-1 md:p-1.5 text-gray-100" />
        ) : (
          <FaChevronRight className="bg-rose-700 h-7 md:h-8 w-7 md:w-8 rounded-full p-1 md:p-1.5 text-gray-100" />
        )}
      </button>
    </>
  );
};

export default Sidebar;
