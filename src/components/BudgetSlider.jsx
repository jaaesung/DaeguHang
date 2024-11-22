import React, { useState } from "react";
import "./Popup.css";

const BudgetSlider = ({ selectedBudget, onComplete }) => {
  const [sliderValue, setSliderValue] = useState(selectedBudget || 0);

  const handleSliderChange = (e) => setSliderValue(e.target.value);

  return (
    <div className="popup">
      <h2 className="popup-title">예산 설정</h2>
      <div className="popup-slider">
        <label className="popup-slider-label">{sliderValue}만원</label>
        <input
          type="range"
          min="10"
          max="100"
          step="10"
          value={sliderValue}
          onChange={handleSliderChange}
          className="popup-slider-input"
        />
      </div>
      <button className="popup-next" onClick={() => onComplete(sliderValue)}>
        확인
      </button>
    </div>
  );
};

export default BudgetSlider;
