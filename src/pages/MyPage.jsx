import React, { useRef } from "react";
import Header from "../components/Header";
import PlanItem from "../components/PlanItem";
import "./Mypage.css";

const Mypage = () => {
  const myPlans = [
    {
      id: 1,
      title: "이월드 벚꽃놀이",
      date: "2024.3.12 ~ 2024.3.12",
      image: "image1.jpg",
    },
    {
      id: 2,
      title: "동성로 맛집투어",
      date: "2024.8.19 ~ 2024.8.20",
      image: "",
    },
    {
      id: 3,
      title: "김광석 거리",
      date: "2024.10.12 ~ 2024.10.12",
      image: "image3.jpg",
    },
  ];

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="mypage-container">
      <Header />

      <div className="mypage-layout">
        {/* 왼쪽 사이드바 */}
        <aside className="mypage-sidebar">
          <div className="profile-summary">
            <div className="profile-icon">👤</div>
            <div className="profile-name">배재성</div>
            <div className="profile-id">jae089265@naver.com</div>
          </div>
        </aside>

        {/* 오른쪽 메인 콘텐츠 */}
        <main className="mypage-main">
          {/* 내 정보 카드 */}
          <section className="basic-info-card">
            <h3 className="card-title">기본 정보</h3>
            <div className="card-content">
              <div className="info-row">
                <span>전화번호</span>
                <span className="editable">+82 10-2***-4***</span>
                <button className="edit-button">수정</button>
              </div>
              <div className="info-row">
                <span>이메일</span>
                <span className="editable">ja*******@n*******.*om</span>
                <button className="edit-button">등록</button>
              </div>
              <div className="info-row">
                <span>비밀번호</span>
                <button className="edit-button">비밀번호 수정</button>
              </div>
            </div>
          </section>

          {/* 내 계획 섹션 */}
          <section className="mypage-plans-section">
            <h3 className="plans-title">내 계획</h3>
            <div className="plans-carousel-wrapper">
              {/* 왼쪽 화살표 버튼 */}
              <button className="scroll-button left" onClick={scrollLeft}>
                ◀
              </button>

              {/* 가로 스크롤 영역 */}
              <div className="plans-carousel" ref={scrollRef}>
                {myPlans.map((plan) => (
                  <PlanItem
                    key={plan.id}
                    title={plan.title}
                    date={plan.date}
                    image={plan.image}
                  />
                ))}
              </div>

              {/* 오른쪽 화살표 버튼 */}
              <button className="scroll-button right" onClick={scrollRight}>
                ▶
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Mypage;
