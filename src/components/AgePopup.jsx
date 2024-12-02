import React, { useState } from "react";
import "./Popup.css";

const AgePopup = ({ selectedAge, onAgeSelect, onNext }) => {
  const [localAge, setLocalAge] = useState(selectedAge);

  const handleSelectAge = (age) => setLocalAge(age);

  const ageOptions = ["10대", "20대", "30대", "40대", "50대", "60대"];

  return (
    <div className="popup">
      <h2 className="popup-title">연령대가 어떻게 되시나요?</h2>
      <div className="popup-age-grid">
        {ageOptions.map((age) => (
          <button
            key={age}
            onClick={() => handleSelectAge(age)}
            className={`popup-age-button ${localAge === age ? "selected" : ""}`}
          >
            {age}
          </button>
        ))}
      </div>
      <button
        className="popup-next"
        onClick={() => {
          onAgeSelect(localAge);
          onNext();
        }}
        disabled={!localAge} // 선택하지 않으면 비활성화
      >
        다음
      </button>
    </div>
  );
};

export default AgePopup;
