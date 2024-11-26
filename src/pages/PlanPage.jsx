import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import RecommendedPlaces from "../components/RecommendedPlaces";
import Schedule from "../components/Schedule";
import { useLocation } from "react-router-dom";
import { useSchedule } from "../hooks/useSchedule";
import "./PlanPage.css";

const PlanPage = () => {
  const location = useLocation();
  const { startDate, endDate } = location.state || {};
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

  const recommendedPlacesRef = useRef();

  const handleNextDateRef = useRef(handleNextDate);
  useEffect(() => {
    handleNextDateRef.current = handleNextDate;
  }, [handleNextDate]);

  useEffect(() => {
    handleNextDateRef.current();
  }, []);

  return (
    <div className="plan-page">
      <Header />
      <div className="main-content">
        <div className="recommended-places">
          <h3 className="recommended-places-title">추천 장소</h3>
          <RecommendedPlaces
            onAddToPlan={handleAddToPlan}
            hiddenPlaces={hiddenPlaces}
          />
        </div>
        <div className="schedule-section">
          <Schedule
            scheduleItems={scheduleItemsByDate[selectedDate] || []}
            onPreviousDate={handlePreviousDate}
            onNextDate={handleNextDate}
            onRemoveItem={handleRemoveItem}
            onUpdateDuration={handleUpdateDuration}
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
