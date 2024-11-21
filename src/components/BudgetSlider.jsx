import React, { useState } from "react";

const BudgetSlider = ({ onComplete }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleComplete = () => {
    onComplete(sliderValue);
  };

  return (
    <div
      style={{
        width: "50%",
        height: "50%",
        background: "white",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "20px",
        gap: "10px",
      }}
    >
      <label style={{ fontSize: "32px" }}>예산: {sliderValue}만원</label>
      <input
        type="range"
        min="10"
        max="100"
        step="10"
        value={sliderValue}
        onChange={handleSliderChange}
        style={{ width: "80%" }}
      />
      <button
        onClick={handleComplete}
        style={{
          fontSize: "20px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#2C2C2C",
          color: "white",
          cursor: "pointer",
        }}
      >
        다음
      </button>
    </div>
  );
};

export default BudgetSlider;
