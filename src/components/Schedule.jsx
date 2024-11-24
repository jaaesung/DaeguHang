import React from "react";

const Schedule = ({
  scheduleItemsByDate,
  selectedDate,
  onPreviousDate,
  onNextDate,
  onRemoveItem,
  onUpdateDuration,
}) => {
  const scheduleItems = scheduleItemsByDate[selectedDate] || [];

  const formatTime = (hour) => {
    if (hour < 10) return `0${hour}:00`;
    if (hour >= 24) return "00:00";
    return `${hour}:00`;
  };

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
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#fff",
              maxWidth: "100%",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "5px",
                marginRight: "10px",
                objectFit: "cover",
              }}
            />
            <div>
              <strong>{item.name}</strong>
              <div style={{ fontSize: "12px", color: "#777" }}>
                {item.reviews} 리뷰 / ⭐ {item.rating}
              </div>
              <div style={{ marginTop: "5px", fontSize: "12px" }}>
                시작 시간: {formatTime(item.startTime)} <br />
                <span>예정 시간: {item.duration}시간</span>
              </div>
              <div style={{ marginTop: "5px", display: "flex", gap: "5px" }}>
                <button
                  style={{
                    padding: "5px 10px",
                    fontSize: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    background: "#f0f0f0",
                  }}
                  onClick={() =>
                    onUpdateDuration(index, Math.max(1, item.duration - 1))
                  }
                >
                  -1시간
                </button>
                <button
                  style={{
                    padding: "5px 10px",
                    fontSize: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    background: "#f0f0f0",
                  }}
                  onClick={() =>
                    onUpdateDuration(index, Math.min(5, item.duration + 1))
                  }
                >
                  +1시간
                </button>
              </div>
            </div>
            <button
              onClick={() => onRemoveItem(index)}
              style={{
                marginLeft: "auto",
                padding: "5px 10px",
                background: "#ff4d4f",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
