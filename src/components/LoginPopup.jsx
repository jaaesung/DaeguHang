import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./LoginPopup.css";

const LoginPopup = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          loginId,
          password,
        }
      );

      // 로그인 성공 처리
      if (response.status === 200) {
        console.log("Login Successful:", response.data);

        // sessionStorage에 loginId 저장
        sessionStorage.setItem("loginId", loginId);

        // 부모 컴포넌트에 loginId 전달
        onLoginSuccess(loginId);

        alert("로그인 성공");
        onClose(); // 팝업 닫기
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("로그인 실패!");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          username,
          userLoginId: loginId,
          password,
        }
      );
      alert("회원가입 성공");
      onClose();
    } catch (error) {
      console.error("Registration failed:", error);
      alert("회원가입 실패!");
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="login-popup-overlay">
      <div
        className={`login-popup-container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        <button className="login-close-button" onClick={onClose}>
          ✖
        </button>

        {/* 회원가입 폼 */}
        <div className="login-form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>회원가입</h1>
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">회원가입</button>
          </form>
        </div>

        {/* 로그인 폼 */}
        <div className="login-form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>로그인</h1>
            <input
              type="text"
              placeholder="ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">로그인</button>
          </form>
        </div>

        <div className="login-overlay-container">
          <div className="login-overlay">
            <div className="login-overlay-panel overlay-left">
              <h1>오랜만이에요!</h1>
              <p>로그인하고 다시 저희와 함께 여행을 계획해봐요!</p>
              <button
                className="ghost"
                onClick={() => setIsRightPanelActive(false)}
              >
                로그인
              </button>
            </div>
            <div className="login-overlay-panel overlay-right">
              <h1>안녕하세요!</h1>
              <p>가입하고 저희와 함께 여행을 계획해봐요!</p>
              <button
                className="ghost"
                onClick={() => setIsRightPanelActive(true)}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LoginPopup;
