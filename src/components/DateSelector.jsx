import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateSelector = ({ onDateSelect }) => {
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDateClick = () => setIsPopupOpen(true); // Open the date popup when clicked

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange([ranges.selection]);
    if (startDate && endDate && startDate <= endDate) {
      setIsPopupOpen(false);
      onDateSelect();
    }
  };

  return (
    <div>
      <div
        style={{ fontSize: "32px", cursor: "pointer" }}
        onClick={handleDateClick}
      >
        날짜:{" "}
        {`${dateRange[0].startDate.toLocaleDateString()} ~ ${dateRange[0].endDate.toLocaleDateString()}`}
      </div>
      {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            height: "70%",
            background: "white",
            borderRadius: "10px",
            padding: "20px",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          />
        </div>
      )}
    </div>
  );
};

export default DateSelector;
