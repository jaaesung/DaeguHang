import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./popup.css";

const DateSelector = ({ onDateSelect, onNext }) => {
  const [dateRange, setDateRange] = useState([
    { startDate: null, endDate: null, key: "selection" }, // 초기값을 null로 설정
  ]);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange([ranges.selection]);
    if (startDate && endDate) {
      onDateSelect(startDate, endDate);
    }
  };

  return (
    <div className="popup">
      <div className="popup-header">
        <h2 className="popup-title">날짜 선택</h2>
      </div>
      <div className="popup-content">
        <div className="date-range-container">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={["#2c2c2c"]}
          />
        </div>
      </div>
      <div className="popup-footer">
        <button
          className="popup-next"
          onClick={onNext}
          disabled={!dateRange[0].startDate || !dateRange[0].endDate} // 시작일과 종료일이 선택되지 않으면 비활성화
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default DateSelector;
