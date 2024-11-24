import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./LoginPopup.css";

const LoginPopup = ({ isOpen, onClose }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

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
          <form>
            <h1>회원가입</h1>
            <span>use yourID for registration</span>
            <input type="text" placeholder="Name" />
            <input type="ID" placeholder="ID" />
            <input type="password" placeholder="Password" />
            <button>회원가입</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="login-form-container sign-in-container">
          <form>
            <h1>로그인</h1>
            <span>use your account</span>
            <input type="ID" placeholder="ID" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>로그인</button>
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
