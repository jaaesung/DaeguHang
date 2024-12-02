import React, { useState, useEffect } from "react";
import PlaceCard from "./PlaceCard";
import "./RecommendedPlaces.css";

const RecommendedPlaces = ({ places, onAddToPlan, hiddenPlaces }) => {
  const [activeTab, setActiveTab] = useState("명소");

  return (
    <div className="recommended-places-container">
      <div className="tabs">
        {["명소", "식당", "숙소"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="scrollable-content">
        {places[activeTab].length > 0 ? (
          places[activeTab]

            .filter((place) => !hiddenPlaces.includes(place.name))
            .map((place) => (
              <PlaceCard
                key={place.id}
                imageURL={place.imageURL}
                searchUrl={place.searchUrl}
                name={place.name}
                blogReviews={place.blogReviews}
                visitorReviews={place.visitorReviews}
                rate={place.rate}
                latitude={place.latitude}
                longitude={place.longitude}
                onAddToPlan={() => onAddToPlan(place)} // 여기에서 전달된 함수 호출
              />
            ))
        ) : (
          <div className="no-places">추천 장소가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default RecommendedPlaces;
