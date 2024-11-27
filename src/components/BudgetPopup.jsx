import React, { useState } from "react";

const BudgetInputs = ({ initialBudgets, onComplete }) => {
  const [budgets, setBudgets] = useState(
    initialBudgets || {
      shopping: 0,
      lodging: 0,
      culture: 0,
      dining: 0,
      entertainment: 0,
    }
  );

  // 변수명과 한글 표시 매핑
  const categoryLabels = {
    shopping: "소매/쇼핑",
    lodging: "숙박",
    culture: "스포츠 및 문화",
    dining: "외식",
    entertainment: "유흥",
  };

  const handleInputChange = (category, value) => {
    // 숫자 유효성 검사 및 300,000원 제한
    if (!isNaN(value) && value >= 0 && value <= 300000) {
      setBudgets((prevBudgets) => ({
        ...prevBudgets,
        [category]: parseInt(value, 10) || 0,
      }));
    }
  };

  return (
    <div className="popup">
      <h2 className="popup-title">예산 설정</h2>
      <div className="popup-slider">
        {Object.entries(budgets).map(([category, value]) => (
          <div key={category} className="popup-input-group">
            <label className="popup-input-label">{categoryLabels[category]}</label>
            <input
              type="number"
              value={value}
              min="0"
              max="300000"
              onChange={(e) => handleInputChange(category, e.target.value)}
              className="popup-input popup-slider-input"
              placeholder="0"
            />
            <span className="popup-input-unit">원</span>
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

export default BudgetInputs;
