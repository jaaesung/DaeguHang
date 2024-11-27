import React, { useEffect, useState } from "react";
import axios from "axios";
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
  placeId, // 추가된 props
}) => {
  const [placeDetails, setPlaceDetails] = useState(null); // API로 받은 상세 정보
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
        일정에 추가
      </button>
    </div>
  );
};

export default PlaceCard;
