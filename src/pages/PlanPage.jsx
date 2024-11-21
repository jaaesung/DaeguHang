import React, { useState } from "react";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import RecommendedPlaces from "../components/RecommendedPlaces";
import Schedule from "../components/Schedule";

const PlanPage = () => {
  const [schedule, setSchedule] = useState([]);

  const places = {
    명소: [
      {
        imageUrl: "https://via.placeholder.com/100",
        name: "팔공산갓바위",
        reviews: 120,
        rating: 4,
        latitude: 35.9714721000006,
        longitude: 128.693859601329,
      },
      {
        imageUrl: "https://via.placeholder.com/100",
        name: "팔공산갓바위",
        reviews: 120,
        rating: 4,
        latitude: 35.9714721000006,
        longitude: 128.693859601329,
      },
      {
        imageUrl: "https://via.placeholder.com/100",
        name: "팔공산갓바위",
        reviews: 120,
        rating: 4,
        latitude: 35.9714721000006,
        longitude: 128.693859601329,
      },
      {
        imageUrl: "https://via.placeholder.com/100",
        name: "팔공산갓바위",
        reviews: 120,
        rating: 4,
        latitude: 35.9714721000006,
        longitude: 128.693859601329,
      },
      {
        imageUrl:
          "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20221117_109%2F1668659533902XYqos_JPEG%2F7ECDB743-3466-4FB8-A327-524935EA2430.jpeg",
        name: "국립대구박물관 러스티코 우드파이어 키친",
        reviews: 85,
        rating: 5,
        latitude: 35.840418899999,
        longitude: 128.628765475332,
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

  const handleAddToPlan = (place) => {
    let startTime = 10;
    if (schedule.length > 0) {
      const lastItem = schedule[schedule.length - 1];
      startTime = lastItem.startTime + lastItem.duration;
      if (startTime >= 24) startTime = 10;
    }

    const newScheduleItem = {
      ...place,
      startTime: startTime,
      duration: 2,
    };
    setSchedule([...schedule, newScheduleItem]);
  };

  const handleRemoveFromPlan = (index) => {
    const newSchedule = [...schedule];
    newSchedule.splice(index, 1);
    for (let i = index; i < newSchedule.length; i++) {
      if (i === 0) {
        newSchedule[i].startTime = 10;
      } else {
        newSchedule[i].startTime =
          newSchedule[i - 1].startTime + newSchedule[i - 1].duration;
      }
    }
    setSchedule(newSchedule);
  };

  const handleUpdateDuration = (index, newDuration) => {
    const newSchedule = [...schedule];
    newSchedule[index].duration = newDuration;
    for (let i = index + 1; i < newSchedule.length; i++) {
      newSchedule[i].startTime =
        newSchedule[i - 1].startTime + newSchedule[i - 1].duration;
    }
    setSchedule(newSchedule);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          height: "calc(100% - 60px)",
          position: "relative", // 부모 요소를 기준으로 위치 설정
        }}
      >
        {/* 좌측 추천 장소 영역 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#f8f8f8",
            borderRight: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
            position: "relative", // 버튼 위치 조정을 위해
          }}
        >
          {/* 상단 추천 장소 영역 */}
          <div
            style={{
              flex: 2,
              padding: "20px",
              overflowY: "auto",
              borderBottom: "1px solid #ddd",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              추천 장소
            </h3>
            <RecommendedPlaces places={places} onAddToPlan={handleAddToPlan} />
          </div>

          <div
            style={{
              padding: "10px",
              backgroundColor: "#f8f8f8",
              boxShadow: "0 -1px 3px rgba (0, 0, 0, 0.1)",
              position: "sticky",
              bottom: 0,
              textAlign: "center",
            }}
          >
            <button
              style={{
                width: "100%",
                padding: "20px",
                backgroundColor: "#2C2C2C",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
              onClick={() => alert("계획 생성 완료")}
            >
              계획 생성
            </button>
          </div>
        </div>

        {/* 중앙 일정 목록 */}
        <div
          style={{
            flex: 1.5,
            backgroundColor: "#fff",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <Schedule
            scheduleItems={schedule}
            onRemoveItem={handleRemoveFromPlan}
            onUpdateDuration={handleUpdateDuration}
          />
        </div>

        {/* 우측 지도 영역 */}
        <div style={{ flex: 1.5, backgroundColor: "#e0e0e0" }}>
          <MapDisplay scheduleItems={schedule} />
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
