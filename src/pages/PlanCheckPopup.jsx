import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./PlanCheckPopup.css";
import axios from "axios";

const PlanCheckPopup = ({ userId, planId, onClose }) => {
  const [schedulesByDate, setSchedulesByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  // 날짜별로 그룹화하고, 시간 변환 추가
  const groupByDate = (schedules) => {
    return schedules.reduce((acc, item) => {
      const date = item.startTime.split("T")[0];

      const formattedItem = {
        ...item,
        formattedStartTime: formatTime(item.startTime),
        formattedEndTime: formatTime(item.endTime),
        duration: `${(
          (new Date(item.endTime).getTime() -
            new Date(item.startTime).getTime()) /
          (60 * 60 * 1000)
        ).toFixed(1)} 시간`,
      };

      if (!acc[date]) acc[date] = [];
      acc[date].push(formattedItem);
      return acc;
    }, {});
  };

  // 시간 변환 함수 (+9시간 추가)
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const utcTime = date.getTime();
    const localTime = utcTime + 9 * 60 * 60 * 1000; // UTC+9
    const localDate = new Date(localTime);
    const hours = String(localDate.getHours()).padStart(2, "0");
    const minutes = String(localDate.getMinutes()).padStart(2, "0");
    return `${hours}시 ${minutes}분`;
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/schedule/${userId}/get/${planId}`
        );

        const groupedSchedules = groupByDate(response.data);
        setSchedulesByDate(groupedSchedules);
        setSelectedDate(Object.keys(groupedSchedules)[0]);
      } catch (error) {
        console.error("일정 데이터를 가져오는 중 오류 발생:", error);
        alert("일정 데이터를 가져올 수 없습니다.");
      }
    };

    fetchSchedules();
  }, [userId, planId]);

  const handlePreviousDate = () => {
    const dates = Object.keys(schedulesByDate);
    const currentIndex = dates.indexOf(selectedDate);
    if (currentIndex > 0) {
      setSelectedDate(dates[currentIndex - 1]);
    }
  };

  const handleNextDate = () => {
    const dates = Object.keys(schedulesByDate);
    const currentIndex = dates.indexOf(selectedDate);
    if (currentIndex < dates.length - 1) {
      setSelectedDate(dates[currentIndex + 1]);
    }
  };

  return (
    <div className="plan-check-popup-overlay">
      <div className="plan-check-popup-content">
        <button className="plan-check-close-button" onClick={onClose}>
          ×
        </button>
        <h2>일정</h2>

        {Object.keys(schedulesByDate).length > 0 && selectedDate ? (
          <>
            <div className="plan-check-date-navigation">
              <button
                className="plan-check-nav-button"
                onClick={handlePreviousDate}
                disabled={
                  Object.keys(schedulesByDate).indexOf(selectedDate) === 0
                }
              >
                이전
              </button>
              <span>{selectedDate}</span>
              <button
                className="plan-check-nav-button"
                onClick={handleNextDate}
                disabled={
                  Object.keys(schedulesByDate).indexOf(selectedDate) ===
                  Object.keys(schedulesByDate).length - 1
                }
              >
                다음
              </button>
            </div>

            <div className="plan-check-schedule-list">
              {schedulesByDate[selectedDate].map((schedule) => (
                <div
                  key={schedule.scheduleId}
                  className="plan-check-schedule-item"
                >
                  <img
                    src={schedule.imageURL || "https://via.placeholder.com/150"}
                    alt={schedule.name}
                    className="plan-check-schedule-image"
                  />
                  <div className="plan-check-schedule-details">
                    <h4>
                      <a
                        href={`https://map.naver.com/v5/search/${encodeURIComponent(
                          schedule.name
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {schedule.name}
                      </a>
                    </h4>
                    <p>
                      시작 시간: {schedule.formattedStartTime} <br />
                      종료 시간: {schedule.formattedEndTime} <br />
                      예정 시간: {schedule.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>등록된 일정이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

PlanCheckPopup.propTypes = {
  userId: PropTypes.string.isRequired,
  planId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PlanCheckPopup;
