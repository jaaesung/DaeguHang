import React, { useState } from "react";
import PlaceCard from "./PlaceCard"; // PlaceCard 컴포넌트 가져오기

const RecommendedPlaces = ({ places, onAddToPlan }) => {
  const [activeTab, setActiveTab] = useState("명소"); // 기본 탭 설정

  return (
    <div>
      {/* 탭 버튼 */}
      <div style={{ display: "flex", marginBottom: "20px" }}>
        {["명소", "식당", "숙소"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: activeTab === tab ? "#ddd" : "#fff",
              border: "1px solid #ccc",
              cursor: "pointer",
              fontWeight: activeTab === tab ? "bold" : "normal",
              outline: "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {places[activeTab].map((place, index) => (
          <PlaceCard
            key={index}
            imageUrl={place.imageUrl}
            name={place.name}
            reviews={place.reviews}
            rating={place.rating}
            latitude={place.latitude}
            longitude={place.longitude}
            onAddToPlan={() => onAddToPlan(place)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedPlaces;
