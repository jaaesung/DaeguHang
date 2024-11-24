import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import RecommendedPlaces from "../components/RecommendedPlaces";
import Schedule from "../components/Schedule";
import { useLocation } from "react-router-dom";
import "./PlanPage.css";

const PlanPage = () => {
  const location = useLocation();
  const { startDate, endDate } = location.state || {};
  const [scheduleItemsByDate, setScheduleItemsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(startDate || "");

  // Calculate range of dates between startDate and endDate
  const calculateDateRange = (start, end) => {
    const dateArray = [];
    let currentDate = new Date(start);
    while (currentDate <= new Date(end)) {
      dateArray.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  // Initialize schedule for all dates
  useEffect(() => {
    if (startDate && endDate) {
      const allDates = calculateDateRange(startDate, endDate);
      const initializedSchedule = allDates.reduce(
        (acc, date) => ({ ...acc, [date]: [] }),
        {}
      );
      setScheduleItemsByDate(initializedSchedule);
      setSelectedDate(startDate); // Set the initial selected date
    }
  }, [startDate, endDate]);

  // Handlers for navigating between dates
  const handlePreviousDate = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(previousDate.getDate() - 1);
    const newDate = previousDate.toISOString().split("T")[0];
    if (previousDate >= new Date(startDate)) {
      setSelectedDate(newDate);
    }
  };

  const handleNextDate = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const newDate = nextDate.toISOString().split("T")[0];
    if (nextDate <= new Date(endDate)) {
      setSelectedDate(newDate);
    }
  };

  // Add a new item to the schedule
  const handleAddToPlan = (place) => {
    const dateKey = selectedDate.split("T")[0];
    const existingSchedule = scheduleItemsByDate[dateKey] || [];
    let startTime = 10;

    if (existingSchedule.length > 0) {
      const lastItem = existingSchedule[existingSchedule.length - 1];
      startTime = lastItem.startTime + lastItem.duration;
    }

    if (startTime >= 24) {
      alert(
        "Cannot add more plans for this date. The start time exceeds 24:00."
      );
      return;
    }

    const newScheduleItem = {
      ...place,
      startTime,
      duration: 2,
    };

    setScheduleItemsByDate((prev) => ({
      ...prev,
      [dateKey]: [...existingSchedule, newScheduleItem],
    }));
  };

  // Mark the plan creation as complete
  const handlePlanComplete = () => {
    alert("Plan successfully created!");
    console.log("Full Schedule:", scheduleItemsByDate);
  };

  // Recommended places mock data
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
        name: "식당 1",
        reviews: 150,
        rating: 4.5,
        latitude: 37.555665,
        longitude: 126.936888,
      },
    ],
    숙소: [
      {
        imageUrl: "https://via.placeholder.com/100",
        name: "숙소 1",
        reviews: 300,
        rating: 4.7,
        latitude: 37.523988,
        longitude: 126.973259,
      },
    ],
  };

  return (
    <div className="plan-page">
      <Header />

      <div className="main-content">
        {/* Recommended Places Section */}
        <div className="recommended-places">
          <div className="recommended-places-list">
            <h3 className="recommended-places-title">추천 장소</h3>
            <RecommendedPlaces places={places} onAddToPlan={handleAddToPlan} />
          </div>

          <div className="plan-complete-button-container">
            <button
              className="plan-complete-button"
              onClick={handlePlanComplete}
            >
              계획 생성
            </button>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="schedule-section">
          <Schedule
            scheduleItemsByDate={scheduleItemsByDate}
            selectedDate={selectedDate}
            onPreviousDate={handlePreviousDate}
            onNextDate={handleNextDate}
            onRemoveItem={(index) => {
              const dateKey = selectedDate.split("T")[0];
              const updatedSchedule = [...(scheduleItemsByDate[dateKey] || [])];
              updatedSchedule.splice(index, 1);
              setScheduleItemsByDate((prev) => ({
                ...prev,
                [dateKey]: updatedSchedule,
              }));
            }}
            onUpdateDuration={(index, newDuration) => {
              const dateKey = selectedDate.split("T")[0];
              const updatedSchedule = [...(scheduleItemsByDate[dateKey] || [])];
              updatedSchedule[index].duration = newDuration;
              setScheduleItemsByDate((prev) => ({
                ...prev,
                [dateKey]: updatedSchedule,
              }));
            }}
          />
        </div>

        {/* Map Section */}
        <div className="map-display-section">
          <MapDisplay scheduleItems={scheduleItemsByDate[selectedDate] || []} />
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
