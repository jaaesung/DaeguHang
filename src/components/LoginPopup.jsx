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
            <h1>Create Account</h1>
            <span>or use yourID for registration</span>
            <input type="text" placeholder="Name" />
            <input type="ID" placeholder="ID" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="login-form-container sign-in-container">
          <form>
            <h1>Sign In</h1>
            <span>or use your account</span>
            <input type="ID" placeholder="ID" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="login-overlay-container">
          <div className="login-overlay">
            <div className="login-overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                onClick={() => setIsRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="login-overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button
                className="ghost"
                onClick={() => setIsRightPanelActive(true)}
              >
                Sign Up
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
