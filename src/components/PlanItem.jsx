import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./PlanItem.css";

const PlanItem = ({ id, title, date, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/plan/${id}`); // 클릭 시 PlanPage로 이동
  };

  return (
    <div className="plan-item" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img
        src={image || "https://via.placeholder.com/850x965"} // 기본 placeholder 이미지
        alt={title || "계획 이미지"}
        className="plan-image"
      />
      <p className="plan-title">{title || "계획 없음"}</p> {/* title 출력 */}
      <p className="plan-date">{date || "날짜 미정"}</p> {/* date 출력 */}
    </div>
  );
};

PlanItem.propTypes = {
  id: PropTypes.string.isRequired, // PlanPage로 이동할 때 필요한 ID
  title: PropTypes.string.isRequired, // title을 반드시 받도록 설정
  date: PropTypes.string.isRequired, // date를 반드시 받도록 설정
  image: PropTypes.string, // 선택적 이미지 URL
};

export default PlanItem;
