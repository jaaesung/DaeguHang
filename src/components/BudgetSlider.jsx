import React, { useState } from "react";
import "./Popup.css";

const BudgetSlider = ({ initialBudgets, onComplete }) => {
  const [budgets, setBudgets] = useState(
    initialBudgets || {
      shopping: 0,
      lodging: 0,
      culture: 0,
      dining: 0,
      entertainment: 0,
    }
  );

  // 예산 카테고리와 한글 라벨
  const categoryLabels = {
    shopping: "소매/쇼핑",
    lodging: "숙박",
    culture: "스포츠 및 문화",
    dining: "외식",
    entertainment: "유흥",
  };

  // 슬라이더 변경 처리 함수
  const handleSliderChange = (category, value) => {
    setBudgets((prevBudgets) => ({
      ...prevBudgets,
      [category]: parseInt(value, 10), // 슬라이더 값은 만 단위
    }));
  };

  return (
    <div className="popup">
      <h2 className="popup-title">1회당 소비 예산을 설정해주세요</h2>
      <div className="popup-slider">
        {Object.entries(budgets).map(([category, value]) => (
          <div key={category} className="popup-input-group">
            <label className="popup-input-label">
              {categoryLabels[category]}
            </label>
            <div className="popup-slider-group">
              <span className="popup-slider-value">{value}만원</span>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={value}
                onChange={(e) => handleSliderChange(category, e.target.value)}
                className="popup-slider-input"
              />
              <span className="popup-input-unit"></span>
            </div>
          </div>
        ))}
      </div>
      <button
        className="popup-next"
        onClick={() => onComplete(budgets)}
        disabled={Object.values(budgets).some((v) => v === 0)}
      >
        확인
      </button>
    </div>
  );
};

export default BudgetSlider;
