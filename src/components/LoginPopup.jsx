import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";  // axios 임포트
import "./LoginPopup.css";

const LoginPopup = ({ isOpen, onClose }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        loginId,
        password,
      });
      const { userId } = response.data; // 응답에서 userId 추출
      if (userId) {
        sessionStorage.setItem('userId', userId); // Session Storage에 userId 저장
      }
      alert(response.data.message || "로그인 성공"); // 성공 메시지 표시
      onClose(); // 로그인 후 팝업 닫기
    } catch (error) {
      console.error("Login failed", error);
    // 서버에서 전송된 에러 메시지를 출력
    if (error.response && error.response.data) {
      alert(error.response.data); // 서버의 에러 메시지가 문자열 형태로 전달되므로 그대로 출력
    } else {
      alert("로그인 실패: 서버와 연결할 수 없습니다."); // 서버와 연결할 수 없을 때의 처리
    }
    }
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/api/user/register',
        {
          username,
          userLoginId: loginId,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json', // 명확히 Content-Type을 JSON으로 지정
          },
        }
      );
  
      const { userId } = response.data; // 응답에서 userId 추출
      if (userId) {
        sessionStorage.setItem('userId', userId); // Session Storage에 userId 저장
      }
  
      alert("회원가입 성공");
      onClose(); // 회원가입 후 팝업 닫기
    } catch (error) {
      console.error("Registration failed", error);
  
      if (error.response && error.response.data) {
        alert(`회원가입 실패: ${error.response.data || "오류가 발생했습니다."}`);
      } else {
        alert("회원가입 실패: 서버와 연결할 수 없습니다.");
      }
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
        {/* Close Button */}
        <button className="login-close-button" onClick={onClose}>
          ✖
        </button>

        {/* Sign Up Form */}
        <div className="login-form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>회원가입</h1>
            <span>use yourID for registration</span>
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

        {/* Sign In Form */}
        <div className="login-form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>로그인</h1>
            <span>use your account</span>
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
            <a href="#">Forgot your password?</a>
            <button type="submit">로그인</button>
          </form>
        </div>

        {/* Overlay */}
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
