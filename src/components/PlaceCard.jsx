import React, { useEffect, useState } from "react";
import axios from "axios";

const PlaceCard = ({
  imageUrl,
  name,
  reviews,
  rating,
  latitude,
  longitude,
  onAddToPlan,
  placeId,
}) => {
  const [placeDetails, setPlaceDetails] = useState(null);
  const [placeType, setPlaceType] = useState(""); // placeType을 내부 상태로만 관리

  useEffect(() => {
    // placeId가 주어지면 해당 장소의 상세 정보를 API로 받아옴
    if (placeId) {
      axios
        .get(`http://localhost:8080/api/place/${placeId}`)
        .then((response) => {
          setPlaceDetails(response.data); // 받아온 상세 정보를 상태에 저장
          setPlaceType(response.data.type); // placeType 정보를 내부 상태에 저장
        })
        .catch((error) => {
          console.error("API 호출 중 오류 발생:", error);
        });
    }
  }, [placeId]); // placeId가 변경될 때마다 API 호출

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "16px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "8px",
          objectFit: "cover",
          marginRight: "16px",
        }}
      />
      <div style={{ flex: 1 }}>
        <h4
          style={{
            fontSize: "16px",
            fontWeight: "600",
            margin: "0 0 8px 0",
            color: "#333",
          }}
        >
          {name}
        </h4>
        <p style={{ fontSize: "14px", color: "#777", margin: "0 0 4px 0" }}>
          {reviews} 리뷰
        </p>
        <p style={{ fontSize: "14px", color: "#FFD700", margin: 0 }}>
          {`⭐`.repeat(rating)}
        </p>
      </div>

      <button
        onClick={() => onAddToPlan({ name, latitude, longitude })}
        style={{
          marginLeft: "auto",
          padding: "5px 10px",
          background: "#2C2C2C",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        일정에 추가
      </button>
    </div>
  );
};

export default PlaceCard;
