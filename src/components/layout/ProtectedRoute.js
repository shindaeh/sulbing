import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
// import { AuthContext} from "./AuthProvider";




const ProtectedRoute = ({ children }) => {
    //const { isAuthenticate } = useContext(AuthContext);
    const { isAuthenticated } = useAuth();

    const location = useLocation();


    if (!isAuthenticated) {
        alert("로그인이 필요합니다.");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    return children;
};


export default ProtectedRoute;