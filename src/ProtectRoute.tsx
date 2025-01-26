import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useGetCurrentUserQuery } from "./store/authApi";
import { useSelector} from "react-redux";
import { RootState } from "./store";

const ProtectRoute: React.FC = () => {
  // const { data: user, isLoading } = useGetCurrentUserQuery();

  const user = useSelector((state: RootState) => state.auth.user);


  // if (isLoading) {
  //     return <div>loading...</div>;
  // }
   

 return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
