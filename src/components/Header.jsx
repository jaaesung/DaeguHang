import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login and logout handlers
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e0e0e0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontWeight: "500",
          color: "black",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        대구행
      </div>

      {/* Navigation Menu */}
      <div style={{ display: "flex", gap: "24px" }}>
        {isLoggedIn ? (
          <>
            <button
              style={{
                background: "none",
                border: "none",
                color: "black",
                fontSize: 16,
                fontWeight: "400",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "5px",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#f2f2f2")}
              onMouseOut={(e) => (e.target.style.background = "none")}
              onClick={() => alert("내 정보 페이지로 이동합니다.")}
            >
              내 정보
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                color: "black",
                fontSize: 16,
                fontWeight: "400",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "5px",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#f2f2f2")}
              onMouseOut={(e) => (e.target.style.background = "none")}
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                background: "none",
                border: "none",
                color: "black",
                fontSize: 16,
                fontWeight: "400",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "5px",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#f2f2f2")}
              onMouseOut={(e) => (e.target.style.background = "none")}
              onClick={handleLogin}
            >
              로그인
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                color: "black",
                fontSize: 16,
                fontWeight: "400",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "5px",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#f2f2f2")}
              onMouseOut={(e) => (e.target.style.background = "none")}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
