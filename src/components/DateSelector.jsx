import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./popup.css";

const DateSelector = ({ onDateSelect, onNext }) => {
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
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
      <h2 className="popup-title">날짜 선택</h2>
      <div className="date-range-container">
        <DateRange
          editableDateInputs={true}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          rangeColors={["#2c2c2c"]}
        />
      </div>
      <button className="popup-next" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

export default DateSelector;
