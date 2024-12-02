import React, { useState } from "react";
import "./Popup.css";

const GenderPopup = ({ selectedGender, onGenderSelect, onNext }) => {
  const [localGender, setLocalGender] = useState(selectedGender);

  const handleSelectGender = (gender) => setLocalGender(gender);

  return (
    <div className="popup">
      <h2 className="popup-title">누구와 함께 하나요?</h2>
      <div className="popup-gender-grid">
        <button
          onClick={() => handleSelectGender("남")}
          className={`popup-gender-button ${
            localGender === "남" ? "selected" : ""
          }`}
        >
          남자
        </button>
        <button
          onClick={() => handleSelectGender("여")}
          className={`popup-gender-button ${
            localGender === "여" ? "selected" : ""
          }`}
        >
          여자
        </button>
      </div>
      <button
        className="popup-next"
        onClick={() => {
          onGenderSelect(localGender);
          onNext();
        }}
        disabled={!localGender}
      >
        다음
      </button>
    </div>
  );
};

export default GenderPopup;
