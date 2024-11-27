import React, { useState, useEffect } from "react";
import PlaceCard from "./PlaceCard";
import "./RecommendedPlaces.css";

const RecommendedPlaces = () => {
  const [places, setPlaces] = useState({
    명소: [],
    식당: [],
    숙소: [],
  });

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        // 1. Fetch data from the API
        const response = await fetch("http://localhost:8080/recommendfdsfation");
        const data = await response.json();

        // 2. Process the data into desired format
        const categorizedPlaces = {
          명소: [],
          식당: [],
          숙소: [],
        };

        data.forEach((item, index) => {
          const mappedItem = {
            id: index + 1, // Assign a unique ID
            imageUrl: item.imageUrl || "https://via.placeholder.com/100", // Placeholder for image
            name: item.가맹점명 || "Unknown Name",
            reviews: item.reviews || 0, // Default to 0 if reviews are missing
            rating: (item.reviews / 20).toFixed(1) || "3.0", // Mock rating calculation
            latitude: item.latitude || 0.0, // Default to 0.0 if latitude is missing
            longitude: item.longitude || 0.0, // Default to 0.0 if longitude is missing
            searchUrl: item.searchUrl || "#", // Fallback URL
          };

          // Categorize based on "분류"
          if (item.분류 === "맛집") {
            categorizedPlaces.식당.push(mappedItem);
          } else if (item.분류 === "모텔/호텔") {
            categorizedPlaces.숙소.push(mappedItem);
          } else {
            categorizedPlaces.명소.push(mappedItem);
          }
        });

        // 3. Update state with categorized places
        setPlaces(categorizedPlaces);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchAndProcessData();
  }, []);

  const [activeTab, setActiveTab] = useState("명소");

  return (
    <div className="recommended-places-container">
      {/* Tab buttons */}
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

      {/* Scrollable content */}
      <div className="scrollable-content">
        {places[activeTab].length > 0 ? (
          places[activeTab].map((place) => (
            <PlaceCard
              key={place.id}
              imageUrl={place.imageUrl}
              name={place.name}
              reviews={place.reviews}
              rating={place.rating}
              latitude={place.latitude}
              longitude={place.longitude}
              searchUrl={place.searchUrl}
            />
          ))
        ) : (
          <div className="empty-message">추천 장소가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default RecommendedPlaces;
