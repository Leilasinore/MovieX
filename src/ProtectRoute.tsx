import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "./store/authApi";

const ProtectRoute: React.FC = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
      return <div>loading...</div>;
  }
   

 return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
