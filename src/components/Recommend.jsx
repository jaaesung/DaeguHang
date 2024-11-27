import React, { useState } from "react";
import axios from "axios";
import RecommendedPlaces from "./RecommendedPlaces";

const FLASK_API_URL = "http://127.0.0.1:8080/recommendation"; // 변경된 API URL

const RecommendationPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hiddenPlaces, setHiddenPlaces] = useState([]); // 숨긴 장소 관리

  const sendRecommendationRequest = async () => {
    const cluster = document.getElementById("cluster").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;

    // 금액 필드 값 읽기
    const shopping = parseFloat(document.getElementById("shopping").value) || 0;
    const lodging = parseFloat(document.getElementById("lodging").value) || 0;
    const culture = parseFloat(document.getElementById("culture").value) || 0;
    const dining = parseFloat(document.getElementById("dining").value) || 0;
    const entertainment = parseFloat(document.getElementById("entertainment").value) || 0;

    // 입력값 검증
    if (!cluster || !age || !gender) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    const payload = {
      cluster: parseInt(cluster),
      age: parseInt(age),
      gender: gender,
      spending: {
        "소매/쇼핑": shopping,
        "숙박": lodging,
        "스포츠 및 문화": culture,
        "외식": dining,
        "유흥": entertainment
      }
    };

    try {
      const response = await fetch(FLASK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("서버 오류:", errorData);
        alert(`서버 오류: ${errorData.error || "Unknown error"}`);
        return;
      }

      const data = await response.json();
      setRecommendations(data); // 추천 결과를 state에 저장
    } catch (error) {
      console.error("네트워크 오류:", error);
      alert("네트워크 오류 발생.");
    }
  };

  // 로딩 중일 때와 오류 발생 시 처리
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>추천 관광지</h1>

      {/* 입력 폼 */}
      <div>
        <label>클러스터: </label>
        <input type="text" id="cluster" />
        <label>나이: </label>
        <input type="number" id="age" />
        <label>성별: </label>
        <select id="gender">
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
        <label>쇼핑 금액: </label>
        <input type="number" id="shopping" />
        <label>숙박 금액: </label>
        <input type="number" id="lodging" />
        <label>문화 금액: </label>
        <input type="number" id="culture" />
        <label>외식 금액: </label>
        <input type="number" id="dining" />
        <label>유흥 금액: </label>
        <input type="number" id="entertainment" />

        <button onClick={sendRecommendationRequest}>추천 받기</button>
      </div>

      {/* 추천 결과 */}
      <RecommendedPlaces
        onAddToPlan={(place) => console.log("일정에 추가된 장소:", place)}
        hiddenPlaces={hiddenPlaces} // 숨긴 장소 리스트 전달
        places={recommendations}  // 추천 데이터를 전달
      />
    </div>
  );
};

export default RecommendationPage;
