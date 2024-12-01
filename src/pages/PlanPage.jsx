import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import RecommendedPlaces from "../components/RecommendedPlaces";
import Schedule from "../components/Schedule";
import { useSchedule } from "../hooks/useSchedule";
import "./PlanPage.css";

const PlanPage = () => {
  const location = useLocation();
  const { startDate, endDate, scheduleItems } = location.state || {};

  const {
    scheduleItemsByDate,
    selectedDate,
    handlePreviousDate,
    handleNextDate,
    handleAddToPlan,
    handleRemoveItem,
    handleUpdateDuration,
    hiddenPlaces,
    handleReorder,
  } = useSchedule(startDate, endDate);

  // useRef와 useEffect로 handleNextDate 업데이트 및 첫 실행
  const handleNextDateRef = useRef(handleNextDate);
  useEffect(() => {
    handleNextDateRef.current = handleNextDate;
  }, [handleNextDate]);

  useEffect(() => {
    handleNextDateRef.current(); // 첫 렌더링 시 handleNextDate 실행
  }, []);

  const handleCreatePlan = async () => {
    const planData = {
      startDate,
      endDate,
      scheduleItems: scheduleItemsByDate,
    };

    try {
      const response = await fetch("/api/savePlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planData),
      });

      if (response.ok) {
        alert("계획이 성공적으로 저장되었습니다!");
        // 페이지 이동 또는 추가 액션 수행
      } else {
        alert("계획 저장 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("계획 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="plan-page">
      <Header />
      <div className="main-content">
        <div className="recommended-places-container">
          <div className="recommended-places">
            <h3 className="recommended-places-title">추천 장소</h3>
            <div className="recommended-places-list">
              <RecommendedPlaces
                places={scheduleItems} // places props 추가
                onAddToPlan={handleAddToPlan} // onAddToPlan을 전달
                hiddenPlaces={hiddenPlaces}
              />
            </div>
          </div>
          <div className="plan-button-container">
            <button className="plan-complete-button" onClick={handleCreatePlan}>
              계획 생성
            </button>
          </div>
        </div>

        <div className="schedule-section">
          <Schedule
            scheduleItems={scheduleItemsByDate[selectedDate] || []}
            onPreviousDate={handlePreviousDate}
            onNextDate={handleNextDate}
            onRemoveItem={handleRemoveItem}
            onUpdateDuration={handleUpdateDuration}
            onReorder={(newOrder) => handleReorder(selectedDate, newOrder)}
            selectedDate={selectedDate}
          />
        </div>

        <div className="map-display-section">
          <MapDisplay scheduleItems={scheduleItemsByDate[selectedDate] || []} />
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
