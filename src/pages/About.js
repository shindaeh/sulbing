import React from "react";

import "../assets/css/about.css";

const About = () => {
  return (
    <div>
      <section className="intro">
        <h2>설빙은 맛과 문화를 담는 디저트 브랜드입니다.</h2>
        <p>
          2013년, 전통과 현대의 조화를 담은 <strong>인절미 설빙</strong>으로
          시작한 설빙은
          <br />
          이제 국내외 수백 개 매장을 가진 글로벌 디저트 카페로 성장했습니다.
        </p>
      </section>

      <section className="history">
        <h2>브랜드 연혁</h2>
        <ul>
          <li>
            <strong>2013</strong> : 설빙 1호점 오픈
          </li>
          <li>
            <strong>2014</strong> : 전국 가맹점 100호 돌파
          </li>
          <li>
            <strong>2017</strong> : 해외 진출 (중국, 태국 등)
          </li>
          <li>
            <strong>2024</strong> : 누적 방문자 1억명 돌파
          </li>
        </ul>
      </section>

      <section className="vision">
        <h2>우리는 이런 브랜드입니다</h2>
        <ul>
          <li>전통을 현대적으로 재해석</li>
          <li>세계로 나아가는 K-디저트</li>
          <li>고객 중심 서비스</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
