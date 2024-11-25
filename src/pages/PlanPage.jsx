import React, { useEffect } from "react";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import RecommendedPlaces from "../components/RecommendedPlaces";
import Schedule from "../components/Schedule";
import { useLocation } from "react-router-dom";
import { useSchedule } from "../hooks/useSchedule";
import { useRef } from "react";
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
  } = useSchedule(startDate, endDate);

  const places = {
    명소: [
      {
        imageUrl: "https://via.placeholder.com/100",
        name: "팔공산갓바위",
        reviews: 120,
        rating: 4,
        latitude: 35.9714721000006,
        longitude: 128.693859601329,
        searchUrl:
          "https://map.naver.com/p/smart-around/place/37327760?c=15.00,0,0,0,dh",
      },
    ],

    식당: [
      {
        imageUrl: "https://via.placeholder.com/100",
        name: "팔공산갓바위",
        reviews: 120,
        rating: 4,
        latitude: 35.9714721000006,
        longitude: 128.693859601329,
        searchUrl:
          "https://map.naver.com/p/smart-around/place/37327760?c=15.00,0,0,0,dh",
      },
    ],

    숙소: [
      {
        imageUrl: "https://via.placeholder.com/100",
        name: "팔공산갓바위",
        reviews: 120,
        rating: 4,
        latitude: 35.9714721000006,
        longitude: 128.693859601329,
        searchUrl:
          "https://map.naver.com/p/smart-around/place/37327760?c=15.00,0,0,0,dh",
      },
    ],
  };

  // `handleNextDate`를 추적하는 Ref 생성
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
          <div className="recommended-places-list">
            <h3 className="recommended-places-title">추천 장소</h3>
            <RecommendedPlaces places={places} onAddToPlan={handleAddToPlan} />
          </div>
        </div>
        <div className="schedule-section">
          <Schedule
            scheduleItemsByDate={scheduleItemsByDate}
            selectedDate={selectedDate}
            onPreviousDate={handlePreviousDate}
            onNextDate={handleNextDate}
            onRemoveItem={handleRemoveItem}
            onUpdateDuration={handleUpdateDuration}
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
