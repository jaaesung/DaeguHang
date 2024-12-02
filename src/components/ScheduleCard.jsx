import React from "react";
import "./ScheduleCard.css";

const ScheduleCard = ({
  item,
  index,
  onUpdateDuration,
  onRemoveItem,
  setHoveredItemIndex,
}) => {
  const formatTime = (hour) => {
    if (hour < 10) return `0${hour}:00`;
    if (hour >= 24) return "00:00";
    return `${hour}:00`;
  };

  return (
    <div
      className="schedule-card"
      onMouseEnter={() => setHoveredItemIndex(index)}
      onMouseLeave={() => setHoveredItemIndex(null)}
    >
      <img
        src={item.imageURL}
        alt={item.name}
        className="schedule-card-image"
      />
      <div className="schedule-card-details">
        <strong>{item.name}</strong>
        <div>
          {item.visitorReviews} 리뷰 / ⭐ {item.rate}
        </div>
      </div>
      <div className="schedule-card-time">
        <div>시작 시간: {formatTime(item.startTime)}</div>
        <div>예정 시간: {item.duration}시간</div>
      </div>
      <div className="schedule-card-actions">
        <button
          onClick={() =>
            onUpdateDuration(index, Math.max(1, item.duration - 1))
          }
        >
          -1시간
        </button>
        <button
          onClick={() =>
            onUpdateDuration(index, Math.min(5, item.duration + 1))
          }
        >
          +1시간
        </button>
      </div>
      <button
        onClick={() => onRemoveItem(index)}
        className="schedule-card-delete"
      >
        삭제
      </button>
    </div>
  );
};

export default ScheduleCard;
