import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserFromLocalStorage } from "../src/store/authUtils";

const ProtectRoute: React.FC = () => {
    const authToken = getUserFromLocalStorage()

   

 return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
