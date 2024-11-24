import React from "react";
import PropTypes from "prop-types";
import "./PlanItem.css";

const PlanItem = ({ title, date, image }) => {
  return (
    <div className="plan-item">
      <img
        src={image || "https://via.placeholder.com/850x965"} // 이미지가 없으면 기본 placeholder 이미지 사용
        alt={title}
        className="plan-image"
      />
      <p className="plan-title">{title || "계획 없음"}</p>
      <p className="plan-date">{date || "날짜 미정"}</p>
    </div>
  );
};

PlanItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
};

export default PlanItem;
