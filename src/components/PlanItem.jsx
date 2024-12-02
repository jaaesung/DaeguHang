import React from "react";
import PropTypes from "prop-types";
import "./PlanItem.css";

const PlanItem = ({ id, title, startDate, endDate, onClick, onDelete }) => {
  const formatDate = (date) => {
    if (!date) return "날짜 미정";
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1); // 날짜에 하루를 추가
    return `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(newDate.getDate()).padStart(2, "0")}`;
  };

  return (
    <div
      className="plan-item"
      style={{ position: "relative", cursor: "pointer" }}
    >
      <img
        src="https://via.placeholder.com/850x965"
        alt={title || "계획 이미지"}
        className="plan-image"
        onClick={() => onClick(id)}
      />
      <div className="plan-item-content">
        <p className="plan-title">{title || "계획 없음"}</p>
        <p className="plan-date">
          {startDate && endDate
            ? `${formatDate(startDate)} ~ ${formatDate(endDate)}`
            : "날짜 미정"}
        </p>
      </div>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation(); // 부모의 클릭 이벤트 전파 방지
          onDelete(id); // 삭제 요청 호출
        }}
      >
        삭제
      </button>
    </div>
  );
};

PlanItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PlanItem;
