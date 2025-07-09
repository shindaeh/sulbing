

import React, { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("Authorization");
        setIsAuthenticated(!!token);
    }, []);


    const login = () => {
        setIsAuthenticated(true);
    };


    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("Authorization");
        localStorage.removeItem("Authorization-refresh");
        localStorage.removeItem("memberEmail");
        localStorage.removeItem("memberName");
        localStorage.removeItem("isLogin");
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);


