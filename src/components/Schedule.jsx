import React from "react";
import { Reorder } from "framer-motion";
import ScheduleCard from "./ScheduleCard";
import "./Schedule.css";

const Schedule = ({
  scheduleItems,
  onPreviousDate,
  onNextDate,
  onRemoveItem,
  onUpdateDuration,
  onReorder,
  selectedDate,
}) => {
  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <button className="schedule-button" onClick={onPreviousDate}>
          이전
        </button>
        <h3 className="schedule-title">
          내 일정 ({new Date(selectedDate).toLocaleDateString()})
        </h3>
        <button className="schedule-button" onClick={onNextDate}>
          다음
        </button>
      </div>
      <Reorder.Group
        axis="y"
        onReorder={onReorder} // 드래그 이후 순서 업데이트 핸들러
        values={scheduleItems}
        className="schedule-items"
      >
        {scheduleItems.map((item, index) => (
          <Reorder.Item
            key={item.name}
            value={item} // 고유 값으로 item 객체 전달
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
              cursor: "grab",
            }}
          >
            <ScheduleCard
              item={item}
              index={index}
              onUpdateDuration={onUpdateDuration}
              onRemoveItem={() => onRemoveItem(index)}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default Schedule;
