import React from "react";
import "../App.css";

function Main() {
  return (
    <div>
      {/* ✅ 인기 메뉴 */}
      <section className="menu">
        <h2>인기 메뉴 🍓</h2>
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
          <li>6월 신메뉴 출시!</li>
        </ul>
      </section>
    </div>
  );
}

export default Main;
