import React from "react";
import "../assets/css/MenuDetail.css";

const MangoPage = () => {
  return (
    <div className="menu-detail-container">
      <h2 className="menu-title">🥭 망고 빙수</h2>
      <img
        src="/images/main_images/mango.jpg"
        alt="망고빙수"
        className="menu-image"
      />
      <p>상큼한 망고와 부드러운 우유 얼음이 만난 달콤한 여름 디저트!</p>
      <p className="menu-price">💰 가격: 13,800원</p>
    </div>
  );
};

export default MangoPage;
