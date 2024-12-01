import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PlanItem.css";

const PlanItem = ({ id }) => {
  const navigate = useNavigate();
  const [plans, setPlan] = useState(null); // 계획 데이터를 저장할 상태

  // 사용자 id 가져오기
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    // 계획 데이터 가져오기
    const fetchPlan = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8080/api/plan/${userId}/get`);
        console.log(response.data);
        const planData = response.data;  // response.data 가 배열로 넘어오니까

        setPlan(planData); // 응답 데이터로 상태 업데이트 planData도 배열로 넘어오고

      } catch (error) {
        console.error("Error fetching plan data:", error);
      }
    };

    fetchPlan(); // 컴포넌트 마운트 시 호출
  }, [id, userId]); // id와 userId가 변경될 때마다 호출

  if (!plans) {
    return <div>Loading...</div>;
  }

  const handleClick = (planId) => {
    navigate(`/plan/${planId}`); // 클릭 시 해당 계획 페이지로 이동
  };

  // 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
  const formatDate = (date) => {
    if (!date) return "날짜 미정";
    const newDate = new Date(date);
    return `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="plan-list">
      {plans.map((plan) => (<div className="plan-item" onClick={handleClick} style={{ cursor: "pointer" }}>
        <img
          src="https://via.placeholder.com/850x965" // 기본 placeholder 이미지
          alt={plan.title || "계획 이미지"}
          className="plan-image"
        />
        <p className="plan-title">{plan.title || "계획 없음"}</p> {/* title 출력 */}
        <p className="plan-date">
          {plan.startDate && plan.endDate ? `${formatDate(plan.startDate)} ~ ${formatDate(plan.endDate)}` : "날짜 미정"}
        </p> {/* startDate와 endDate 출력 */}
      </div>))}
    </div>
  );
};

PlanItem.propTypes = {
  id: PropTypes.string.isRequired, // PlanPage로 이동할 때 필요한 ID
};

export default PlanItem;
