import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Mainpage.css";

const rotatingWords = ["선택", "친구", "도움", "계획"]; // 전환되는 단어 목록

const images = [
  "http://www.daeguview.com/DATA/photo/thumb_b_2018_02_02.jpg",
  "http://www.daeguview.com/DATA/photo/thumb_b_20190930095251.jpg",
  "http://www.daeguview.com/DATA/photo/thumb_b_20231101114824.jpg",
  "http://www.daeguview.com/DATA/photo/thumb_b_competition_2023_00681_3.jpg",
];

export default function Mainpage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // 시작하기 버튼 클릭 핸들러
  const handleStartClick = () => {
    navigate("/input"); // InputScreen으로 이동
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex(
          (prevIndex) => (prevIndex + 1) % rotatingWords.length
        );
        setIsAnimating(false);
      }, 500); // 애니메이션 지속 시간
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mainpage-container">
      {/* Header 컴포넌트 */}
      <Header />
      <div className="main-content">
        {/* 왼쪽 섹션 */}
        <div className="left-section">
          <h1 className="main-title">
            대구 여행을 위한 최고의{" "}
            <span className={`rotating-word ${isAnimating ? "spin" : ""}`}>
              {rotatingWords[currentWordIndex]}
            </span>
          </h1>
          <p className="main-description">
            대구행과 함께 나만의 여행을 계획하세요
          </p>
          <button className="start-button" onClick={() => handleStartClick()}>
            시작하기
          </button>
        </div>

        {/* 오른쪽 섹션 */}
        <div className="right-section">
          <div className="slider">
            {images.map((image, index) => (
              <div
                key={index}
                className={`slide ${currentIndex === index ? "active" : ""}`}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
