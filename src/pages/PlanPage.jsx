import React, { useState } from "react";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import RecommendedPlaces from "../components/RecommendedPlaces";
import Schedule from "../components/Schedule";
import { useLocation } from "react-router-dom";
import "./PlanPage.css";

const PlanPage = () => {
  const [scheduleItemsByDate, setScheduleItemsByDate] = useState({});
  const location = useLocation();
  const { startDate, endDate } = location.state || {};

  const [selectedDate, setSelectedDate] = useState(startDate);

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "날짜 없음";
  };

  const handlePreviousDate = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(previousDate.getDate() - 1);
    if (previousDate >= new Date(startDate)) {
      setSelectedDate(previousDate.toISOString().split("T")[0]);
    }
  };

  const handleNextDate = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    if (nextDate <= new Date(endDate)) {
      setSelectedDate(nextDate.toISOString());
    }
  };

  const handleAddToPlan = (place) => {
    let startTime = 10;
    const dateKey = selectedDate.split("T")[0]; // 날짜만 키로 사용
    const existingSchedule = scheduleItemsByDate[dateKey] || [];

    if (existingSchedule.length > 0) {
      const lastItem = existingSchedule[existingSchedule.length - 1];
      startTime = lastItem.startTime + lastItem.duration;
      if (startTime >= 24) startTime = 10;
    }

    const newScheduleItem = {
      ...place,
      startTime,
      duration: 2,
    };

    setScheduleItemsByDate({
      ...scheduleItemsByDate,
      [dateKey]: [...existingSchedule, newScheduleItem],
    });
  };

  const handleUpdateDuration = (index, newDuration) => {
    const dateKey = selectedDate.split("T")[0];
    const existingSchedule = scheduleItemsByDate[dateKey] || [];

    const updatedSchedule = [...existingSchedule];
    updatedSchedule[index].duration = newDuration;

    for (let i = index + 1; i < updatedSchedule.length; i++) {
      const previousEndTime =
        updatedSchedule[i - 1].startTime + updatedSchedule[i - 1].duration;

      if (previousEndTime >= 24) {
        updatedSchedule.splice(i); // 이후 일정 제거
        break;
      }

      updatedSchedule[i].startTime = previousEndTime;
    }

    setScheduleItemsByDate({
      ...scheduleItemsByDate,
      [dateKey]: updatedSchedule,
    });
  };

  const handlePlanComplete = () => {
    alert("계획이 생성되었습니다!");
    console.log("전체 일정:", scheduleItemsByDate);
  };

  const handleRemoveFromPlan = (index) => {
    const dateKey = selectedDate.split("T")[0];
    const existingSchedule = scheduleItemsByDate[dateKey] || [];

    const updatedSchedule = [...existingSchedule];
    updatedSchedule.splice(index, 1);

    for (let i = index; i < updatedSchedule.length; i++) {
      if (i === 0) {
        updatedSchedule[i].startTime = 10;
      } else {
        updatedSchedule[i].startTime =
          updatedSchedule[i - 1].startTime + updatedSchedule[i - 1].duration;
      }
    }

    setScheduleItemsByDate({
      ...scheduleItemsByDate,
      [dateKey]: updatedSchedule,
    });
  };

  const places = {
    명소: [
      {
        name: "대박집 월배역직영점",
        latitude: 35.8535,
        longitude: 128.5653,
        description: "대구의 멋진 돼지 고기 전문점입니다.",
      },
      {
        name: "러스티코우드파이어",
        latitude: 35.840418899999,
        longitude: 128.628765475332,
        description: "대구의 인기 있는 한식당입니다.",
      },
      {
        imageUrl: "https://via.placeholder.com/100",
        name: "장소 A",
        review: 1,
        rating: 3,
        latitude: 35.8535,
        longitude: 128.5653,
        description: "대구의 멋진 장소입니다.",
      },
      {
        name: "장소 B",
        review: 1,
        rating: 3,
        latitude: 35.8571,
        longitude: 128.5699,
        description: "대구의 또 다른 명소입니다.",
      },
      {
        name: "장소 C",
        review: 1,
        rating: 3,
        latitude: 35.8502,
        longitude: 128.5611,
        description: "자연과 어우러진 장소.",
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
      },
    ],
  };

  return (
    <div className="plan-page">
      <Header />

      <div className="main-content">
        {/* 추천 장소 영역 */}
        <div className="recommended-places">
          <div className="recommended-places-list">
            <h3 className="recommended-places-title">추천 장소</h3>
            <RecommendedPlaces places={places} onAddToPlan={handleAddToPlan} />
          </div>

          {/* 계획 생성 버튼 */}
          <div className="plan-complete-button-container">
            <button
              className="plan-complete-button"
              onClick={handlePlanComplete}
            >
              계획 생성
            </button>
          </div>
        </div>

        {/* 일정 목록 영역 */}
        <div className="schedule-section">
          <Schedule
            scheduleItemsByDate={scheduleItemsByDate}
            selectedDate={selectedDate}
            onPreviousDate={handlePreviousDate}
            onNextDate={handleNextDate}
            onRemoveItem={handleRemoveFromPlan}
            onUpdateDuration={handleUpdateDuration} // 전달
          />
        </div>

        {/* 지도 영역 */}
        <div className="map-display-section">
          <MapDisplay scheduleItems={scheduleItemsByDate[selectedDate] || []} />
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
