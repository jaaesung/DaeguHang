import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = () => {
    navigate("/plan");
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

          <button className="submit-button" onClick={handleSubmit}>
            추천 시작
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
