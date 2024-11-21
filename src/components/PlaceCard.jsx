import React from "react";

const PlaceCard = ({
  imageUrl,
  name,
  reviews,
  rating,
  latitude,
  longitude,
  onAddToPlan,
}) => {
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
