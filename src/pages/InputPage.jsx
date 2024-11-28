import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import TravelTitle from "../components/TravelTitle";
import DateSelector from "../components/DateSelector";
import GenderPopup from "../components/GenderPopup";
import AgePopup from "../components/AgePopup";
import BudgetSlider from "../components/BudgetSlider";
import ClusterPopup from "../components/ClusterPopup";
import "./InputPage.css";

const InputPage = () => {
  const navigate = useNavigate();

  const [showClusterPopup, setShowClusterPopup] = useState(true);
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [showGenderPopup, setShowGenderPopup] = useState(false);
  const [showAgePopup, setShowAgePopup] = useState(false);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [budgetCategoryIndex, setBudgetCategoryIndex] = useState(0); // 현재 예산 카테고리 인덱스

  const budgetCategories = ["쇼핑", "숙박", "문화", "식비", "유흥"]; // 예산 카테고리 배열
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedBudgets, setSelectedBudgets] = useState({
    쇼핑: null,
    숙박: null,
    문화: null,
    식비: null,
    유흥: null,
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [scheduleItems, setScheduleItems] = useState([]);

  const handleSubmit = () => {
    navigate("/plan", { state: { startDate, endDate } });
  };

  const handleBudgetComplete = (budget) => {
    const category = budgetCategories[budgetCategoryIndex];
    setSelectedBudgets((prev) => ({ ...prev, [category]: budget }));

    if (budgetCategoryIndex < budgetCategories.length - 1) {
      setBudgetCategoryIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowBudgetPopup(false);
    }
  };

  return (
    <div className="input-screen">
      <Header />
      <div className="main-content">
        <div className="left-content">
          <TravelTitle />

          <div className="selector-text">
            클러스터: <span>{selectedCluster || "선택되지 않음"}</span>
          </div>
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
          {Object.keys(selectedBudgets).map((category) => (
            <div className="selector-text" key={category}>
              {category} 예산:{" "}
              <span>{selectedBudgets[category] || "선택되지 않음"}</span>
            </div>
          ))}
          <button className="submit-button" onClick={handleSubmit}>
            추천 시작
          </button>
        </div>

        <div style={{ flex: 1, background: "#F5F5F5" }}>
          <MapDisplay scheduleItems={scheduleItems} />
        </div>
      </div>

      {/* 팝업 컴포넌트 */}
      {showClusterPopup && (
        <div className="overlay">
          <ClusterPopup
            onClusterSelect={(id) => setSelectedCluster(id)}
            onNext={() => {
              setShowClusterPopup(false);
              setShowDatePopup(true);
            }}
          />
        </div>
      )}
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
            onGenderSelect={(gender) => setSelectedGender(gender)}
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
            onAgeSelect={(age) => setSelectedAge(age)}
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
            category={budgetCategories[budgetCategoryIndex]}
            selectedBudget={
              selectedBudgets[budgetCategories[budgetCategoryIndex]]
            }
            onComplete={handleBudgetComplete}
          />
        </div>
      )}
    </div>
  );
};

export default InputPage;
