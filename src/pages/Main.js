import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import "../assets/css/main.css";
import Footer from "./Footer";

function Main() {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {/* ✅ 팝업창 */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img
              src="/images/main_images/main_banner_mo_wogcwly.jpg"
              alt="신메뉴"
            />
            <button className="close-btn" onClick={handleClose}>
              닫기
            </button>
          </div>
        </div>
      )}

      {/* ✅ 인기 메뉴 */}
      <section className="menu">
        <h2>인기 메뉴 </h2>
        <div className="menu-items">
          <div className="item">
            <Link to="/menu/strawberry">
              <img src="/images/main_images/strawberry.jpg" alt="딸기빙수" />
            </Link>
            <p>딸기 빙수</p>
          </div>
          <div className="item">
            <Link to="/menu/mango">
              <img src="/images/main_images/mango.jpg" alt="망고빙수" />
            </Link>
            <p>망고 빙수</p>
          </div>
          <div className="item">
            <Link to="/menu/injeolmi">
              <img src="/images/main_images/injeolmi.jpg" alt="인절미빙수" />
            </Link>
            <p>인절미 빙수</p>
          </div>
        </div>
      </section>

      {/* ✅ 공지사항 */}
      <section className="notice">
        <h2>📢 공지사항</h2>
        <ul>
          <Link to="notice" class="link-dark">
            <li>6월 신메뉴 출시!</li>
          </Link>
        </ul>
      </section>

      <hr className="text-success"></hr>

      <section className="footer">
        <img src="images\main_images\sulbing logo.jpg" alt="설빙로고" />
        <Footer />
      </section>
    </div>
  );
}

export default Main;
