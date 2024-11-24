import React from "react";
import ScheduleCard from "./ScheduleCard";

const Schedule = ({
  scheduleItemsByDate,
  selectedDate,
  onPreviousDate,
  onNextDate,
  onRemoveItem,
  onUpdateDuration,
}) => {
  const scheduleItems = scheduleItemsByDate[selectedDate] || [];

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={onPreviousDate}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            background: "#f8f8f8",
            cursor: "pointer",
          }}
        >
          이전
        </button>
        <h3 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>
          내 일정 ({new Date(selectedDate).toLocaleDateString()})
        </h3>
        <button
          onClick={onNextDate}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            background: "#f8f8f8",
            cursor: "pointer",
          }}
        >
          다음
        </button>
      </div>
      <div style={{ display: "grid", gap: "10px" }}>
        {scheduleItems.map((item, index) => (
          <ScheduleCard
            key={index}
            item={item}
            index={index}
            onUpdateDuration={onUpdateDuration}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Schedule;
