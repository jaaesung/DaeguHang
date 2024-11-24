import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios"; // HTTP 요청을 위해 axios 사용
import "./LoginPopup.css";

const LoginPopup = ({ isOpen, onClose }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // 로그인 상태 관리
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // 회원가입 상태 관리
  const [username, setUsername] = useState("");
  const [userLoginId, setUserLoginId] = useState("");
  const [password, setPassword] = useState("");

  // 팝업이 열려있지 않으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  // 로그인 요청 처리 함수
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 동작 방지

    const loginRequest = {
      loginId: loginId, // DTO의 필드명에 맞춤
      password: loginPassword, // 변수명 수정
    };

    try {
      const response = await axios.post("http://localhost:8082/login", loginRequest); // API URL
      console.log("로그인 성공", response.data);
      const { loginId, userId } = response.data; // LoginResponseDTO
      alert(`로그인 성공! ID: ${loginId}, UserID: ${userId}`);
    } catch (error) {
      console.error("로그인 실패", error.response?.data || error.message);
      alert("로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 회원가입 요청 처리 함수
  const handleSignUpSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 동작 방지

    const registerRequest = {
      username: username, // DTO의 필드명에 맞춤
      userLoginId: userLoginId, // DTO와 일치하도록 변경
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8082/register", registerRequest); // API URL
      console.log("회원가입 성공", response.data);
      alert("회원가입에 성공했습니다. 로그인 해주세요.");
      setIsRightPanelActive(false); // 로그인 창으로 이동
    } catch (error) {
      console.error("회원가입 실패", error.response?.data || error.message);
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return ReactDOM.createPortal(
    <div className="login-popup-overlay">
      <div
        className={`login-popup-container ${isRightPanelActive ? "right-panel-active" : ""}`}
      >
        {/* Close Button */}
        <button className="login-close-button" onClick={onClose}>
          ✖
        </button>

        {/* Sign Up Form */}
        <div className="login-form-container sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <h1>회원가입</h1>
            <span>use your ID for registration</span>
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="ID"
              value={userLoginId}
              onChange={(e) => setUserLoginId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">회원가입</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="login-form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>로그인</h1>
            <span>use your account</span>
            <input
              type="text"
              placeholder="ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
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
              <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
                로그인
              </button>
            </div>
            <div className="login-overlay-panel overlay-right">
              <h1>안녕하세요!</h1>
              <p>가입하고 저희와 함께 여행을 계획해봐요!</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
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
