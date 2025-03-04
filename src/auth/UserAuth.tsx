import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function UserAuth() {
   const { user } = useAuth()
   const isUserAuthenticated = user;
   console.log(isUserAuthenticated)

   const navigate = useNavigate();

   useEffect(() => {
      if (!isUserAuthenticated) {
         navigate("/login");
      }
   }, [isUserAuthenticated]);

   return <Outlet />;
}