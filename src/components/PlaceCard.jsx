import React from "react";
import "./PlaceCard.css";

const PlaceCard = ({
  imageUrl,
  name,
  reviews,
  rating,
  latitude,
  longitude,
  searchUrl,
  onAddToPlan,
}) => {
  const handleNameClick = () => {
    if (searchUrl) {
      window.open(searchUrl, "_blank"); // 새 탭에서 URL 열기
    } else {
      alert("해당 장소의 URL이 없습니다."); // URL이 없는 경우 경고 메시지
    }
  };

  return (
    <div className="place-card">
      <img src={imageUrl} alt={name} className="place-card-image" />
      <div className="place-card-details">
        <h4
          className="place-card-title"
          onClick={handleNameClick}
          style={{ cursor: "pointer" }} // 클릭 가능한 스타일
        >
          {name}
        </h4>
        <p className="place-card-reviews">{reviews} 리뷰</p>
        <p className="place-card-rating">⭐ {rating}</p>
      </div>
      <button
        className="place-card-button"
        onClick={() => onAddToPlan({ name, latitude, longitude })}
      >
        추가
      </button>
    </div>
  );
};

export default PlaceCard;
