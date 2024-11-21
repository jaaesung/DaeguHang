import React from "react";

const AgePopup = ({ onAgeSelect }) => {
  const handleSelectAge = (age) => {
    onAgeSelect(age);
  };

  const ageOptions = ["10대", "20대", "30대", "40대", "50대", "60대"];

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
      {ageOptions.map((option) => (
        <button
          key={option}
          onClick={() => handleSelectAge(option)}
          style={{
            fontSize: "32px",
            padding: "10px 20px",
            width: "80%",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#F0F0F0",
            cursor: "pointer",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default AgePopup;
