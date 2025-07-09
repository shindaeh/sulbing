import React, { useEffect } from 'react';
import instance from '../token/interceptors';    

const Logout = () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
            "Authorization-refresh": localStorage.getItem("Authorization-refresh"),

        },
    };

    const handleCommit = async() => {
        console.log("logout");
        const email = localStorage.getItem("memberEmail");
        console.log("email====>", email);
            await instance
            .delete(`/member/logout`, config)
            .then((response)=> {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("Authorization-refresh");
    localStorage.removeItem("memberEmail");
    localStorage.removeItem("memberName");
    localStorage.removeItem("isLogin");
    localStorage.clear();
    window.location.replace("/");
            })
            .catch ((error) =>
            console.log('logout 실패 =>', error.message));
    };

    useEffect(()=> {
        handleCommit();
    },[]);

    //UI 렌더링하지 않음
    return null;
};

export default Logout;