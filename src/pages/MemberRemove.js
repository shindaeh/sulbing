import { useEffect } from "react";
import instance from '../token/interceptors';


const MemberRemove = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("Authorization"),
     
    },
  };


  const memberRemove = async () => {
    if (!window.confirm("정말 탈퇴하시겠습니까?")) return;


    await instance
      .delete(`/member/delete/${localStorage.getItem("memberEmail")}`, config)
      .then((response) => {
        console.log(response);
        localStorage.removeItem("Authorization");
        localStorage.removeItem("Authorization-refresh");
        localStorage.removeItem("memberEmail");
        localStorage.removeItem("memberName");
        localStorage.removeItem("isLogin");
        localStorage.clear();
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    memberRemove();
  }, []);
};


export default MemberRemove;






