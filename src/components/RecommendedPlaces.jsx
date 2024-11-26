import React, { useState } from "react";
import PlaceCard from "./PlaceCard";

const RecommendedPlaces = ({ onAddToPlan, hiddenPlaces }) => {
  const [places] = useState({
    명소: [
      {
        id: 1,
        imageUrl: "https://via.placeholder.com/100",
        name: "팔공산갓바위",
        reviews: 120,
        rating: 4,
        latitude: 35.9714721000006,
        longitude: 128.693859601329,
      },
    ],
    식당: [
      {
        id: 2,
        imageUrl: "https://via.placeholder.com/100",
        name: "팔공산 식당",
        reviews: 80,
        rating: 4.2,
        latitude: 35.85,
        longitude: 128.6,
      },
    ],
    숙소: [
      {
        id: 3,
        imageUrl: "https://via.placeholder.com/100",
        name: "팔공산 숙소",
        reviews: 50,
        rating: 3.8,
        latitude: 35.855,
        longitude: 128.61,
      },
    ],
  });

  const [activeTab, setActiveTab] = useState("명소");

  return (
    <div style={{ minWidth: "400px" }}>
      {" "}
      {/* 최소 너비 설정 */}
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
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "1200px",
          padding: "10px",
          minHeight: "200px", // 최소 높이 설정
          borderRadius: "8px", // 테두리 둥글게 유지
          boxSizing: "border-box",
        }}
      >
        {places[activeTab].length > 0 ? (
          places[activeTab]
            .filter((place) => !hiddenPlaces.includes(place.name)) // 숨겨진 장소 필터링
            .map((place) => (
              <PlaceCard
                key={place.id}
                imageUrl={place.imageUrl}
                name={place.name}
                reviews={place.reviews}
                rating={place.rating}
                latitude={place.latitude}
                longitude={place.longitude}
                onAddToPlan={() => onAddToPlan(place)}
              />
            ))
        ) : (
          <div style={{ textAlign: "center", color: "#999" }}>
            추천 장소가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedPlaces;
