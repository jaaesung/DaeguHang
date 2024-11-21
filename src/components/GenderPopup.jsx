import React from "react";

const GenderPopup = ({ onGenderSelect }) => {
  const handleSelectGender = (gender) => {
    onGenderSelect(gender);
  };

  return (
    <div style={popupStyle}>
      <button onClick={() => handleSelectGender("남자")} style={buttonStyle}>
        남자
      </button>
      <button onClick={() => handleSelectGender("여자")} style={buttonStyle}>
        여자
      </button>
    </div>
  );
};

const popupStyle = {
  width: "50%",
  height: "50%",
  background: "white",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
};

const buttonStyle = {
  fontSize: "32px",
  padding: "20px",
  width: "80%",
};

export default GenderPopup;
