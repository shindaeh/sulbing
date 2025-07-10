import React from "react";
import "../assets/css/MenuDetail.css";

const StrawberryPage = () => {
  return (
    <div className="menu-detail-container">
      <h2 className="menu-title">🍓 딸기 빙수</h2>
      <img
        src="/images/main_images/strawberry.jpg"
        alt="딸기빙수"
        className="menu-image"
      />
      <p className="menu-description">
        상큼한 딸기와 부드러운 우유 얼음이 어우러진 설빙의 대표 빙수입니다.  
        남녀노소 누구나 좋아하는 국민 디저트!
      </p>
      <p className="menu-price">💰 가격: 12,800원</p>
    </div>
  );
};

export default StrawberryPage;