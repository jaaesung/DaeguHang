import React, { useState, useEffect } from "react";
import PlaceCard from "./PlaceCard";
import "./RecommendedPlaces.css";

const RecommendedPlaces = ({ places }) => {
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
          places[activeTab].map((place) => (
            <PlaceCard
                key={place.id}
                imageUrl={place.imageUrl}
                searchUrl={place.searchUrl}
                name={place.name}
                reviews={place.reviews}
                rating={place.rating}
                latitude={place.latitude}
                longitude={place.longitude}
                onAddToPlan={() => onAddToPlan(place)}
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

