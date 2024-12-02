import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PlanItem from "../components/PlanItem";
import NameEditPopup from "../components/NameEditPopup";
import RePasswordPopup from "../components/RePasswordPopup";
import PlanCheckPopup from "./PlanCheckPopup";
import axios from "axios";
import "./Mypage.css";

const Mypage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // 세션에서 userId 가져오기
  const userId = sessionStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState({ loginId: null, name: null });
  const [myPlans, setMyPlans] = useState([]);
  const [isNamePopupOpen, setIsNamePopupOpen] = useState(false);
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
  const [isPlanPopupOpen, setIsPlanPopupOpen] = useState(false); // 팝업 상태 관리
  const [selectedPlanId, setSelectedPlanId] = useState(null); // 선택된 planId 저장

  useEffect(() => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      navigate("/"); // 로그인 페이지로 이동
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/api/user/${userId}/getInfo`
        );

        const { userName, loginId } = userResponse.data;
        setUserInfo({
          name: userName,
          loginId: loginId,
        });
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        alert("사용자 정보를 가져올 수 없습니다.");
      }
    };

    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/plan/${userId}/get`
        );

        // API에서 받은 데이터를 필요한 키로 매핑
        const formattedPlans = response.data.map((plan) => ({
          id: plan.planId, // PLAN_ID를 id로 매핑
          title: plan.title || "제목 없음", // TITLE이 비어 있으면 기본값 설정
          startDate: plan.startDate, // START_DATE 매핑
          endDate: plan.endDate,
          sex: plan.sex,
          age: plan.age,
          budget: plan.budget,
        }));

        setMyPlans(formattedPlans);
      } catch (error) {
        console.error("계획 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    const fetchData = async () => {
      await fetchUserInfo();
      await fetchPlans();
    };

    fetchData();
  }, [userId, navigate]);

  const handleNameSave = async (newName) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/${userId}/updateName`,
        newName,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );

      if (response.status === 200) {
        alert("이름이 성공적으로 변경되었습니다.");
        setUserInfo((prev) => ({ ...prev, name: newName })); // 상태 업데이트
      } else {
        alert("이름 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("이름 변경 중 오류 발생:", error);
      alert("이름 변경 중 오류가 발생했습니다.");
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8080/api/plan/${userId}/delete/${planId}`
      );
      alert("계획이 성공적으로 삭제되었습니다.");
      // 삭제된 계획을 UI에서 제거
      setMyPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== planId));
    } catch (error) {
      console.error("계획 삭제 중 오류 발생:", error);
      alert("계획 삭제 중 문제가 발생했습니다.");
    }
  };

  const handlePasswordSave = async (currentPassword, newPassword) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/${userId}/settings`,
        { currentPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  const handlePlanClick = (planId) => {
    setSelectedPlanId(planId); // 선택된 planId 설정
    setIsPlanPopupOpen(true); // 팝업 열기
  };

  const closePlanPopup = () => {
    setIsPlanPopupOpen(false); // 팝업 닫기
    setSelectedPlanId(null); // 선택된 planId 초기화
  };

  return (
    <div className="mypage-container">
      <Header />

      <div className="mypage-layout">
        <aside className="mypage-sidebar">
          <div className="profile-summary">
            <div className="profile-icon">👤</div>
            <div className="profile-name">{userInfo?.name || "사용자"}</div>
            <div className="profile-id">
              {userInfo?.loginId || "아이디 없음"}
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
                <button
                  className="edit-button"
                  onClick={() => setIsNamePopupOpen(true)} // 팝업 열기
                >
                  이름 수정
                </button>
              </div>
              <div className="info-row">
                <span>아이디</span>
                <span className="editable">
                  {userInfo?.loginId || "아이디 없음"}
                </span>
              </div>
              <div className="info-row">
                <span>비밀번호</span>
                <button
                  className="edit-button"
                  onClick={() => setIsPasswordPopupOpen(true)} // 비밀번호 팝업 열기
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
                      id={plan.id}
                      title={plan.title}
                      sex={plan.sex}
                      age={plan.age}
                      startDate={plan.startDate}
                      endDate={plan.endDate}
                      budget={plan.budget}
                      onClick={handlePlanClick}
                      onDelete={handleDeletePlan} // 삭제 핸들러 전달
                    />
                  ))
                ) : (
                  <p className="no-plans">아직 등록된 계획이 없습니다.</p>
                )}
              </div>
            </div>
          </section>
          <NameEditPopup
            isOpen={isNamePopupOpen}
            onClose={() => setIsNamePopupOpen(false)}
            onSave={handleNameSave}
            currentName={userInfo?.name || ""}
          />
          <RePasswordPopup
            isOpen={isPasswordPopupOpen}
            onClose={() => setIsPasswordPopupOpen(false)}
            onSave={handlePasswordSave}
          />

          {/* PlanCheckPopup */}
          {isPlanPopupOpen && (
            <PlanCheckPopup
              userId={userId}
              planId={selectedPlanId}
              onClose={closePlanPopup}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Mypage;
