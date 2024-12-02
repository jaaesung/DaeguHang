import React from "react";
import PropTypes from "prop-types";
import "./PlanItem.css";

const PlanItem = ({
  id,
  title,
  startDate,
  endDate,
  sex,
  age,
  budget,
  onClick,
  onDelete,
}) => {
  const formatDate = (date) => {
    if (!date) return "날짜 미정";
    const newDate = new Date(date);
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
      <p className="plan-title">{title || "계획 없음"}</p>
      <p className="plan-date">
        {startDate && endDate
          ? `${formatDate(startDate)} ~ ${formatDate(endDate)}`
          : "날짜 미정"}
      </p>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation(); // 부모의 클릭 이벤트 전파 방지
          onDelete(id);
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        X
      </button>
    </div>
  );
};

PlanItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  sex: PropTypes.string,
  age: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  budget: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PlanItem;
