import React, { useState } from "react";
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

  const handleCreatePlan = () => {
    alert("계획이 생성되었습니다!");
    // 여기에 계획 저장 및 페이지 이동 로직 추가
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
                places={scheduleItems} 
                onAddToPlan={handleAddToPlan} // handleAddToPlan 전달
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

