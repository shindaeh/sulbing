import React from "react";
import { NavLink } from "react-router-dom";


const activeStyle = {
  color: "green",
  fontWeight: "bold",
  textDecoration: "underline",
};

const Header = () => {
  return (
    <header>
      <h1>SSulbing</h1>
      <nav aria-label="주요 메뉴">
        <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "1rem" }}>
          <li>
            <NavLink to="/main" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              홈
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              회사소개
            </NavLink>
          </li>
          <li>
            <NavLink to="/board/list" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              게시판
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              로그인
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
