import React from "react";
import "../assets/css/MenuDetail.css";

const InjeolmiPage = () => {
  return (
    <div className="menu-detail-container">
      <h2 className="menu-title">🍘 인절미 빙수</h2>
      <img
        src="/images/main_images/injeolmi.jpg"
        alt="인절미빙수"
         className="menu-image"
      />
      <p>고소한 콩가루와 쫄깃한 인절미가 조화를 이루는 설빙의 대표 메뉴입니다.</p>
      <p className="menu-price">💰 가격: 11,800원</p>
    </div>
  );
};

export default InjeolmiPage;