import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios 임포트
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import TravelTitle from "../components/TravelTitle";
import DateSelector from "../components/DateSelector";
import GenderPopup from "../components/GenderPopup";
import AgePopup from "../components/AgePopup";
import BudgetSlider from "../components/BudgetSlider";
import "./InputPage.css";

const InputPage = () => {
  const navigate = useNavigate();

  const [showDatePopup, setShowDatePopup] = useState(true);
  const [showGenderPopup, setShowGenderPopup] = useState(false);
  const [showAgePopup, setShowAgePopup] = useState(false);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [scheduleItems, setScheduleItems] = useState([]);

  // 신버전 handleSubmit (여행 계획을 생성하는 함수)
  const handleSubmit = async () => {
    // 세션 스토리지에서 userId 가져오기
    const userId = sessionStorage.getItem("userId");

    // userId가 없는 경우 (로그인되지 않은 경우)
    if (!userId) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      navigate("/login"); // 로그인 페이지로 리다이렉트
      return;
    }

    // userId가 있을 경우, 여행 계획을 생성하는 API 호출
    try {
      // 기존 신버전에서 사용하던 상태값들을 서버로 전송
      const response = await axios.post(`http://localhost:8080/api/plan/${userId}/new`, {
        userId, // userId를 리퀘스트에 포함
        startDate: startDate.toISOString().split("T")[0], // ISO 형식으로 변환
        endDate: endDate.toISOString().split("T")[0],
        sex: selectedGender === "남자" ? "MALE" : "FEMALE",
        age: parseInt(selectedAge.replace("대", ""), 10), // "20대" => 20
        budget: parseInt(selectedBudget.replace("만원", ""), 10), // "50만원" => 50
      });

      console.log("API 응답:", response.data);

      // 여행 계획 생성 후, 계획 페이지로 이동
      navigate("/plan", { state: { startDate, endDate, scheduleItems: response.data } });
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      alert("계획을 생성하는 도중 오류가 발생했습니다.");
    }
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
  };

  const handleBudgetComplete = (budget) => {
    setSelectedBudget(`${budget}만원`);
  };

  return (
    <div className="input-screen">
      <Header />
      <div className="main-content">
        <div className="left-content">
          <TravelTitle />

          {/* 날짜 디스플레이 */}
          <div className="selector-text">
            날짜:{" "}
            <span>
              {startDate && endDate
                ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
                : "날짜를 선택하세요"}
            </span>
          </div>

          <div className="selector-text">
            성별: <span>{selectedGender || "선택되지 않음"}</span>
          </div>
          <div className="selector-text">
            연령: <span>{selectedAge || "선택되지 않음"}</span>
          </div>
          <div className="selector-text">
            예산: <span>{selectedBudget || "선택되지 않음"}</span>
          </div>

          {/* 계획 생성 버튼 */}
          <button className="submit-button" onClick={handleSubmit}>
            계획 생성
          </button>
        </div>

        <div style={{ flex: 1, background: "#F5F5F5" }}>
          <MapDisplay scheduleItems={scheduleItems} />
        </div>
      </div>

      {/* 팝업 컴포넌트 */}
      {showDatePopup && (
        <div className="overlay">
          <DateSelector
            onDateSelect={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
            onNext={() => {
              setShowDatePopup(false);
              setShowGenderPopup(true);
            }}
          />
        </div>
      )}
      {showGenderPopup && (
        <div className="overlay">
          <GenderPopup
            selectedGender={selectedGender}
            onGenderSelect={handleGenderSelect}
            onNext={() => {
              setShowGenderPopup(false);
              setShowAgePopup(true);
            }}
          />
        </div>
      )}
      {showAgePopup && (
        <div className="overlay">
          <AgePopup
            selectedAge={selectedAge}
            onAgeSelect={handleAgeSelect}
            onNext={() => {
              setShowAgePopup(false);
              setShowBudgetPopup(true);
            }}
          />
        </div>
      )}
      {showBudgetPopup && (
        <div className="overlay">
          <BudgetSlider
            selectedBudget={selectedBudget}
            onComplete={(budget) => {
              handleBudgetComplete(budget);
              setShowBudgetPopup(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InputPage;

