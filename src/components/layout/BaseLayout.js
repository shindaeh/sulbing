import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const activeStyle = ({ isActive }) => ({
  color: isActive ? "green" : "",
  fontSize: isActive ? "1.2rem" : "",
});

const BaseLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* 상단 로고 */}
      <header className="text-center mt-3">
        <img
          src="/images/main_banner.jpg"
          alt="설빙 배너"
          style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
        />
      </header>

      {/* 네비게이션 */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          {/* 왼쪽 메뉴 그룹 */}
          <ul className="navbar-nav left-menu">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                홈
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                회사소개
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/board/list/1">
                게시판
              </NavLink>
            </li>
          </ul>

          {/* 오른쪽 로그인 메뉴 그룹 */}
          <ul className="navbar-nav  ms-auto">
            <li className="nav-item">
              {!isAuthenticated ? (
                <NavLink className="nav-link" to="/login">
                  로그인
                </NavLink>
              ) : (
                <div className="d-flex gap-3 align-items-center">
                  <NavLink className="nav-link" to="/logout">
                    {localStorage.getItem("memberName") || "사용자"}{" "}
                    <span style={{ fontSize: "10px" }}>로그아웃</span>
                  </NavLink>
                  <NavLink className="nav-link" to="/editinfo">
                    회원수정
                  </NavLink>
                  <NavLink className="nav-link" to="/memberremove">
                    회원탈퇴
                  </NavLink>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default BaseLayout;
