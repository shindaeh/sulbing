import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="row text-primary text-opacity-55 container text-center text-secondary-emphasis">
        <div className="col">
          <Link to="/personalinfoCtrl" className="link-secondary">
            개인정보처리방침
          </Link>
        </div>
        <div className="col">
          <Link to="/opensulbing" className="link-secondary">
            창업문의
          </Link>
        </div>
        <div className="col">
          <Link to="/FAQ" className="link-secondary">
            FAQ
          </Link>
        </div>

        <div className="container-fluid">
          <p className="small">
            법인명:(주)설빙 사업자등록번호 ㅣ 본사 주소: 서울특별시 중구 소월로
            10 단암빌딩 5층 | 대표번호:02-4567-7894 ㅣ 팩스:02-487-6942 |
          </p>
        </div>

        <footer
          className="bg-lightyellow text-brown text-center p-3 mt-5"
          style={{ whiteSpace: "nowrap", overFlow: "auto" }}
        >
          © MyCompany Sulbing. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Footer;
