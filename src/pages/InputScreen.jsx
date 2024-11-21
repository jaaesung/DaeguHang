import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import TravelTitle from "../components/TravelTitle";
import DateSelector from "../components/DateSelector";
import GenderPopup from "../components/GenderPopup";
import AgePopup from "../components/AgePopup";
import BudgetSlider from "../components/BudgetSlider";
import "./InputScreen.css";

const InputScreen = () => {
  const navigate = useNavigate();
  const [showGenderPopup, setShowGenderPopup] = useState(false);
  const [showAgePopup, setShowAgePopup] = useState(false);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [selectedGender, setSelectedGender] = useState("남자");
  const [selectedAge, setSelectedAge] = useState("20대");
  const [selectedBudget, setSelectedBudget] = useState("0만원");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [scheduleItems, setScheduleItems] = useState([]); // Added for locations

  const handleSubmit = () => {
    navigate("/plan");
  };

  // Example function to add a location to scheduleItems
  const addLocationToSchedule = (location) => {
    setScheduleItems([...scheduleItems, location]);
  };

  const handleGenderClick = () => setShowGenderPopup(true);
  const handleAgeClick = () => setShowAgePopup(true);
  const handleBudgetClick = () => setShowBudgetPopup(true);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setShowGenderPopup(false);
  };

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    setShowAgePopup(false);
  };

  const handleBudgetComplete = (budget) => {
    setSelectedBudget(`${budget}만원`);
    setShowBudgetPopup(false);
  };

  return (
    <div className="input-screen">
      <Header />
      <div className="main-content">
        <div className="left-content">
          <TravelTitle />
          <DateSelector
            onDateSelect={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />

          <div className="selector-text" onClick={handleGenderClick}>
            성별: <span>{selectedGender}</span>
          </div>
          <div className="selector-text" onClick={handleAgeClick}>
            연령: <span>{selectedAge}</span>
          </div>
          <div className="selector-text" onClick={handleBudgetClick}>
            예산: <span>{selectedBudget}</span>
          </div>

          <button className="submit-button" onClick={handleSubmit}>
            추천 시작
          </button>
        </div>
        {/* Pass scheduleItems to MapDisplay */}
        <div style={{ flex: 1, background: "#F5F5F5" }}>
          <MapDisplay scheduleItems={scheduleItems} />
        </div>
      </div>

      {showGenderPopup && (
        <div className="overlay" onClick={() => setShowGenderPopup(false)}>
          <GenderPopup onGenderSelect={handleGenderSelect} />
        </div>
      )}
      {showAgePopup && (
        <div className="overlay" onClick={() => setShowAgePopup(false)}>
          <AgePopup onAgeSelect={handleAgeSelect} />
        </div>
      )}
      {showBudgetPopup && (
        <div className="overlay" onClick={() => setShowBudgetPopup(false)}>
          <BudgetSlider onComplete={handleBudgetComplete} />
        </div>
      )}
    </div>
  );
};

export default InputScreen;
