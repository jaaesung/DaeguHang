import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PlanItem from "../components/PlanItem";
import axios from "axios";
import "./Mypage.css";

const Mypage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [userInfo, setUserInfo] = useState(null); // 사용자 정보를 저장
  const [myPlans, setMyPlans] = useState([]); // 사용자의 계획 정보를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const loginId = sessionStorage.getItem("loginId"); // sessionStorage에서 loginId 가져오기
    console.log("Session loginId:", loginId);

    if (!loginId) {
      alert("로그인이 필요합니다.");
      navigate("/login"); // loginId가 없으면 로그인 페이지로 이동
      return;
    }

    const fetchUserInfo = async () => {
      try {
        // 사용자 정보 API 호출
        const userResponse = await axios.get(
          `http://localhost:8080/api/user/${loginId}` // loginId를 사용하여 정보 요청
        );
        console.log("User Info Response:", userResponse.data);
        setUserInfo(userResponse.data); // 사용자 정보 상태 업데이트

        // 사용자 계획 정보 API 호출
        const plansResponse = await axios.get(
          `http://localhost:8080/api/plans/${loginId}` // loginId를 사용하여 계획 요청
        );
        console.log("Plans Response:", plansResponse.data);
        setMyPlans(plansResponse.data); // 계획 정보 상태 업데이트
      } catch (error) {
        console.error(
          "사용자 정보를 가져오는 중 오류 발생:",
          error.response || error.message
        );
        alert("사용자 정보를 가져올 수 없습니다.");
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handlePasswordChangeClick = () => {
    navigate("/repassword");
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="mypage-container">
      <Header />

      <div className="mypage-layout">
        <aside className="mypage-sidebar">
          <div className="profile-summary">
            <div className="profile-icon">👤</div>
            <div className="profile-name">{userInfo?.name || "사용자"}</div>
            <div className="profile-id">
              {userInfo?.username || "아이디 없음"}
            </div>
          </div>
        </aside>

        <main className="mypage-main">
          <section className="basic-info-card">
            <h3 className="card-title">기본 정보</h3>
            <div className="card-content">
              <div className="info-row">
                <span>이름</span>
                <span className="editable">{userInfo?.name || "불명"}</span>
                <button className="edit-button">수정</button>
              </div>
              <div className="info-row">
                <span>아이디</span>
                <span className="editable">
                  {userInfo?.username || "아이디 없음"}
                </span>
              </div>
              <div className="info-row">
                <span>비밀번호</span>
                <button
                  className="edit-button"
                  onClick={handlePasswordChangeClick}
                >
                  비밀번호 수정
                </button>
              </div>
            </div>
          </section>

          <section className="mypage-plans-section">
            <h3 className="plans-title">내 계획</h3>
            <div className="plans-carousel-wrapper">
              <button
                className="scroll-button left"
                onClick={() =>
                  scrollRef.current?.scrollBy({
                    left: -300,
                    behavior: "smooth",
                  })
                }
              >
                ◀
              </button>

              <div className="plans-carousel" ref={scrollRef}>
                {myPlans.length > 0 ? (
                  myPlans.map((plan) => (
                    <PlanItem
                      key={plan.id}
                      title={plan.title}
                      date={plan.date}
                      image={plan.image}
                    />
                  ))
                ) : (
                  <p className="no-plans">아직 등록된 계획이 없습니다.</p>
                )}
              </div>

              <button
                className="scroll-button right"
                onClick={() =>
                  scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })
                }
              >
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
