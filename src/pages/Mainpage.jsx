import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Header 컴포넌트 가져오기

export default function Mainpage() {
  const navigate = useNavigate();

  // 시작하기 버튼 클릭 핸들러
  const handleStartClick = () => {
    navigate("/input"); // InputScreen으로 이동
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#FEF7FF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header 컴포넌트 */}
      <Header />{" "}
      <div
        style={{
          width: "100%",
          maxWidth: 1920,
          height: "100%",
          background: "white",
          borderRadius: 28,
          display: "flex",
          flexDirection: "row", // 가로로 나열
          padding: "20px",
        }}
      >
        {/* 왼쪽 2/3 부분 */}
        <div
          style={{
            flex: 2, // 2/3 부분
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: "20px", // 오른쪽 여백 추가
          }}
        >
          <h1
            style={{
              color: "black",
              fontSize: 64,
              fontFamily: "Roboto",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            대구 여행을 위한 최고의 선택
          </h1>
          <p
            style={{
              width: "80%",
              color: "black",
              fontSize: 24,
              fontFamily: "Roboto",
              fontStyle: "italic",
              fontWeight: "300",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            대구행과 함께 나만의 여행을 계획하세요
          </p>

          {/* 시작하기 버튼 */}
          <div
            style={{
              width: 175,
              height: 52,
              background: "#2C2C2C",
              borderRadius: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleStartClick} // 버튼 클릭 시 InputScreen으로 이동
          >
            <div
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Roboto",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              시작하기
            </div>
          </div>
        </div>

        {/* 오른쪽 1/3 부분 */}
        <div
          style={{
            flex: 1, // 1/3 부분
            height: "100%",
            backgroundImage: "url(https://via.placeholder.com/850x965)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 10,
          }}
        ></div>
      </div>
    </div>
  );
}
