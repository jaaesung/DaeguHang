import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopup";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // userId 저장
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // sessionStorage에서 userId 가져오기
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    sessionStorage.removeItem("userId"); // 로그아웃 시 sessionStorage에서 제거
    navigate("/"); // 홈으로 이동
  };

  const handleMyPage = () => {
    if (userId) {
      navigate(`/mypage?userId=${userId}`); // userId를 쿼리 파라미터로 전달
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <div className="header-container">
      <div className="header-logo" onClick={() => navigate("/")}>
        대구행
      </div>

      <div className="header-buttons">
        {isLoggedIn ? (
          <>
            <button className="header-button" onClick={handleMyPage}>
              내 정보
            </button>
            <button className="header-button" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <button
            className="header-button"
            onClick={() => setIsPopupOpen(true)}
          >
            로그인 / 회원가입
          </button>
        )}
      </div>

      <LoginPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onLoginSuccess={(userId) => {
          setIsLoggedIn(true);
          setUserId(userId);
          sessionStorage.setItem("userId", userId); // userId 저장
          setIsPopupOpen(false); // 팝업 닫기
        }}
      />
    </div>
  );
};

export default Header;
