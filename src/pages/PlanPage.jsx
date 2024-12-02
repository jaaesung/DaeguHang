import React, { useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import RecommendedPlaces from "../components/RecommendedPlaces";
import Schedule from "../components/Schedule";
import { useSchedule } from "../hooks/useSchedule";
import "./PlanPage.css";
import axios from "axios";

const PlanPage = () => {
  const location = useLocation();
  const { startDate, endDate, scheduleItems, clientInfo, traveltitle } =
    location.state || {};
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  console.log("ScheduleItems", scheduleItems);
  if (!userId) {
    alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
    return;
  }
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
      scheduleItems: scheduleItems,
      clientInfo: clientInfo,
    };

    console.log("userId:", userId);
    // console.log('planId:', planId);

    // 이제 넘어온 clientInfo에서 이걸 갖고 plan을 만듦
    try {
      const responseInitPlan = await axios.post(
        // plan 초기화
        `http://127.0.0.1:8080/api/plan/${userId}/new`,
        {
          userId: clientInfo.userId || userId,
          title: clientInfo.title,
          startDate: clientInfo.startDate,
          endDate: clientInfo.endDate,
          sex: clientInfo.gender,
          age: clientInfo.age,
          budget:
            clientInfo.spending["소매/쇼핑"] +
            clientInfo.spending.숙박 +
            clientInfo.spending["스포츠 및 문화"] +
            clientInfo.spending.외식 +
            clientInfo.spending.유흥,
        }
      );

      const planId = responseInitPlan.data.planId; // 여기다가 스케줄 넣기

      // 스케줄 저장
      console.log("스케줄 만들기 : ", scheduleItemsByDate);
      const dtos = Object.keys(scheduleItemsByDate).flatMap((date) =>
        scheduleItemsByDate[date].map((item) => ({
          planId,
          // 로컬 시간으로 변환
          startTime: new Date(
            new Date(date).setHours(item.startTime, 0, 0)
          ).toISOString(),
          endTime: new Date(
            new Date(date).setHours(item.startTime + item.duration, 0, 0)
          ).toISOString(),
          scheduleText: item.description || "",
          placeId: item.placeId,
          type: item.type || "PLACE",
          name: item.name,
          address: item.address || "",
          rate: item.rate || 0,
          imageURL: item.imageURL || "",
        }))
      );

      console.log("반복문을 위한 DTO : ", dtos);

      for (const dto of dtos) {
        await axios.post(
          `http://127.0.0.1:8080/api/schedule/${userId}/create/${planId}`,
          dto
        );
      }

      alert("계획 및 일정이 성공적으로 저장되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error creating plan or schedules:", error);
      alert("계획 생성 중 오류가 발생했습니다.");
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
