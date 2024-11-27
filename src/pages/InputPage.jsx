import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import TravelTitle from "../components/TravelTitle";
import DateSelector from "../components/DateSelector";
import GenderPopup from "../components/GenderPopup";
import AgePopup from "../components/AgePopup";
import BudgetPopup from "../components/BudgetPopup";
import ClusterPopup from "../components/ClusterPopup"; // 클러스터 선택 팝업
import "./InputPage.css";


const InputPage = () => {
  const navigate = useNavigate();

  const [showDatePopup, setShowDatePopup] = useState(false);
  const [showGenderPopup, setShowGenderPopup] = useState(false);
  const [showAgePopup, setShowAgePopup] = useState(false);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [showClusterPopup, setShowClusterPopup] = useState(true); // 클러스터 팝업을 처음에 표시

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedBudgets, setSelectedBudgets] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [travelTitle, setTravelTitle] = useState("여행 제목 1");
  const [selectedCluster, setSelectedCluster] = useState(null); // 클러스터 상태 추가

  // 여행 계획 생성 API 호출
  const handleSubmit = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      navigate("/login");
      return;
    }

    try {
      const { shopping = 0, lodging = 0, culture = 0, dining = 0, entertainment = 0 } =
        selectedBudgets;

      const response = await axios.post(`http://127.0.0.1:8080/api/recommendation`, {
        cluster: parseInt(selectedCluster),  // 선택된 클러스터 값
        userId,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        gender: selectedGender === "남" ? "M" : "F",
        age: parseInt(selectedAge.replace("대", ""), 10),
        spending: {
          "소매/쇼핑": shopping,
          "숙박": lodging,
          "스포츠 및 문화": culture,
          "외식": dining,
          "유흥": entertainment
      },
        title: travelTitle,
      });

      console.log("API 응답:", response.data);
      navigate("/plan", { state: { startDate, endDate, scheduleItems: response.data } });
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      alert("계획을 생성하는 도중 오류가 발생했습니다.");
    }
  };

  // 클러스터 선택
  const handleClusterSelect = (cluster) => {
    setSelectedCluster(cluster);
  };

  // 성별 선택
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  // 연령 선택
  const handleAgeSelect = (age) => {
    setSelectedAge(age);
  };

  // 예산 팝업 완료 시 호출
  const handleBudgetComplete = (budgets) => {
    setSelectedBudgets(budgets);
  };

  // 여행 제목 변경
  const handleTitleChange = (newTitle) => {
    setTravelTitle(newTitle);
  };

  // 예산 합계 계산
  const calculateTotalBudget = () => {
    return Object.values(selectedBudgets).reduce((sum, value) => sum + value, 0);
  };

  return (
    <div className="input-screen">
      <Header />
      <div className="main-content">
        <div className="left-content">
          {/* 여행 제목 입력 컴포넌트 */}
          <TravelTitle title={travelTitle} onChangeTitle={handleTitleChange} />

          {/* 날짜 디스플레이 */}
          <div className="selector-text" onClick={() => setShowDatePopup(true)}>
            날짜:{" "}
            <span>
              {startDate && endDate
                ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
                : "날짜를 선택하세요"}
            </span>
          </div>

          {/* 성별 선택 */}
          <div className="selector-text" onClick={() => setShowGenderPopup(true)}>
            성별: <span>{selectedGender || "선택되지 않음"}</span>
          </div>

          {/* 연령 선택 */}
          <div className="selector-text" onClick={() => setShowAgePopup(true)}>
            연령: <span>{selectedAge || "선택되지 않음"}</span>
          </div>

          {/* 예산 합계 */}
          <div className="selector-text" onClick={() => setShowBudgetPopup(true)}>
            예산 합계:{" "}
            <span>
              {calculateTotalBudget() > 0
                ? `${calculateTotalBudget().toLocaleString()}원`
                : "선택되지 않음"}
            </span>
          </div>

          {/* 클러스터 선택 */}
          <div className="selector-text" onClick={() => setShowClusterPopup(true)}>
            클러스터: <span>{selectedCluster || "선택되지 않음"}</span>
          </div>

          <button className="submit-button" onClick={handleSubmit}>
            계획 생성
          </button>
        </div>

        <div style={{ flex: 1, background: "#F5F5F5" }}>
          <MapDisplay scheduleItems={scheduleItems} />
        </div>
      </div>

      {/* 팝업 컴포넌트들 */}
      {showClusterPopup && (
        <div className="overlay">
          <ClusterPopup
            selectedCluster={selectedCluster}
            onClusterSelect={handleClusterSelect}
            onNext={() => {
              setShowClusterPopup(false);
              setShowDatePopup(true); // 클러스터 선택 후 날짜 팝업으로 이동
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
          <BudgetPopup
            selectedBudgets={selectedBudgets}
            onComplete={(budgets) => {
              handleBudgetComplete(budgets);
              setShowBudgetPopup(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InputPage;
