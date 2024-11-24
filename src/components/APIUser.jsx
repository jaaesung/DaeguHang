import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const response = await axios.post(`${API_BASE_URL}/api/recommend`, clientInfo);
const RecommendComponent = () => {
  const [clientInfo, setClientInfo] = useState({
    name: "",
    preference: "",
  });
  const [recommendations, setRecommendations] = useState(null);

  const handleChange = (e) => {
    setClientInfo({
      ...clientInfo,
      [e.target.name]: e.target.value,
    });
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/recommend", clientInfo);
      setRecommendations(response.data); // Spring Boot에서 반환된 데이터를 상태에 저장
    } catch (error) {
      console.error("Error fetching recommendations:", error.message);
    }
  };

  return (
    <div>
      <h1>추천 받기</h1>
      <input
        type="text"
        name="name"
        placeholder="이름"
        value={clientInfo.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="preference"
        placeholder="선호도"
        value={clientInfo.preference}
        onChange={handleChange}
      />
      <button onClick={fetchRecommendations}>추천 요청</button>
      
      {recommendations && (
        <div>
          <h2>추천 결과:</h2>
          <pre>{JSON.stringify(recommendations, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};


export default RecommendComponent;
