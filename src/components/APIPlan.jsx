import React, { useState } from "react";
import axios from "axios";

const PlanForm = () => {
  const [planData, setPlanData] = useState({
    userId: "",
    startDate: "",
    endDate: "",
    sex: "MALE", // 기본 값 (MALE/FEMALE로 선택)
    age: "",
    budget: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // 입력 변경 핸들러
  const handleChange = (e) => {
    setPlanData({
      ...planData,
      [e.target.name]: e.target.value,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const response = await axios.post(
        "http://localhost:8080/api/plans", // Spring Boot 계획 엔드포인트
        planData
      );
      setResponseMessage("계획 생성 성공! 생성된 계획 정보: " + JSON.stringify(response.data));
    } catch (error) {
      setResponseMessage(
        "계획 생성 실패: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div>
      <h1>계획 생성</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">사용자 ID:</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={planData.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">시작 날짜:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={planData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">종료 날짜:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={planData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="sex">성별:</label>
          <select
            id="sex"
            name="sex"
            value={planData.sex}
            onChange={handleChange}
          >
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
          </select>
        </div>
        <div>
          <label htmlFor="age">나이:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={planData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="budget">예산:</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={planData.budget}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">계획 생성</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default PlanForm;
