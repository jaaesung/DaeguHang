import React, { useState } from "react";
import axios from "axios";

const ScheduleForm = () => {
  const [scheduleData, setScheduleData] = useState({
    planId: "",
    startTime: "",
    endTime: "",
    scheduleText: "",
    placeId: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    setScheduleData({
      ...scheduleData,
      [e.target.name]: e.target.value,
    });
  };

  // 일정 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    try {
      const response = await axios.post(
        "http://localhost:8080/api/schedules", // Spring Boot 일정 생성 엔드포인트
        scheduleData
      );
      setResponseMessage("일정 생성 성공! 생성된 일정 정보: " + JSON.stringify(response.data));
    } catch (error) {
      setResponseMessage(
        "일정 생성 실패: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div>
      <h1>일정 생성</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="planId">계획 ID:</label>
          <input
            type="number"
            id="planId"
            name="planId"
            value={scheduleData.planId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startTime">시작 시간:</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={scheduleData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endTime">종료 시간:</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={scheduleData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="scheduleText">일정 설명:</label>
          <textarea
            id="scheduleText"
            name="scheduleText"
            value={scheduleData.scheduleText}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="placeId">장소 ID:</label>
          <input
            type="number"
            id="placeId"
            name="placeId"
            value={scheduleData.placeId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">일정 생성</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default ScheduleForm;
