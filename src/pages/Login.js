import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import instance from "../token/interceptors";
import { useAuth } from "../components/layout/AuthProvider";
import './Login.css';
const Login = () => {
  const [inputs, setInputs] = useState({
    memberEmail: "",
    memberPass: "",
  });

  const { memberEmail, memberPass } = inputs;
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleValueChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      await instance
        .post(`/login`, inputs)
        .then((response) => {
          console.log(response);

          //응답 헤더에서 토큰 추출
          const accessToken = response.headers["authorization"]; //대소문자 주의
          const refreshToken = response.headers["authorization-refresh"];

          // const accessToken = response.data.accessToken;
          // const refreshToken = response.data.refreshToken;

          console.log("accessToken =>", accessToken);
          console.log("refreshToken =>", refreshToken);

          localStorage.setItem("Authorization", accessToken);
          localStorage.setItem("Authorization-refresh", refreshToken);

          localStorage.setItem("memberEmail", response.data.memberEmail);
          localStorage.setItem("memberName", response.data.memberName);
          localStorage.setItem("authRole", response.data.authRole);
          localStorage.setItem("isLogin", true);

          setInputs({ memberEmail: "", memberPass: "" });
        })
        .then((response) => {
          console.log("then2=>", response);
          window.location.replace("/");
        })
        .catch((error) => console.log("login 오류:", error.message));

      login(); //Contect 상태 변경
      setInputs({ memberEmail: "", memberPass: "" });
      navigate(from, { replace: true }); //이전 경로로 이동
    } catch (err) {
      alert("로그인 실패 : 아이디 또는 비밀번호 확인");
    }
  };

  return (
    <div className="full-screen-center-wrapper">
      {/* <div className="container text-center mt-5"> */}
      {/* div에 login-box 클래스 추가 */}
      <div className="mx-5 login-box">
        <h1>로그인</h1>
        <form onSubmit={onsubmit}>
          <div className="form-group mt-1">
            <input
              type="email"
              name="memberEmail"
              className="form-control"
              id="memberEmail"
              value={memberEmail}
              placeholder="이메일"
              maxLength="20"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mt-1">
            <input
              type="password"
              className="form-control"
              name="memberPass"
              id="memberPass"
              value={memberPass}
              placeholder="비밀번호"
              maxLength="20"
              onChange={handleValueChange}
            />
          </div>
          <div className="mt-1 d-flex justify-content-center gap-2">
            <button type="submit" className="btn btn-primary ">
              로그인
            </button>
            <Link className="btn btn-primary" to="/joinadd">
              회원 가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
