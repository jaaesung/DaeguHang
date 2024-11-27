import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./RePasswordPopup.css";

const RePasswordPopup = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async () => {
    if (newPassword !== newPasswordConfirm) {
      setError("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const userId = 1; // 현재 로그인한 사용자의 ID를 여기에 넣어야 합니다.

    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/${userId}/settings`,
        {
          oldPassword,
          newPassword,
        }
      );
      alert("비밀번호가 성공적으로 변경되었습니다.");
      onClose(); // 비밀번호 변경 후 팝업 닫기
    } catch (error) {
      setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="repassword-popup-overlay">
      <div className="repassword-popup-container">
        <button className="repassword-close-button" onClick={onClose}>
          ✖
        </button>

        <div className="repassword-form-container">
          <h1>비밀번호 변경</h1>
          <form>
            <div className="input-group">
              <label htmlFor="oldpassword">기존 비밀번호</label>
              <input
                id="oldpassword"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="기존 비밀번호를 입력하세요"
              />
            </div>

            <div className="input-group">
              <label htmlFor="newpassword">새 비밀번호</label>
              <input
                id="newpassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호를 입력하세요"
              />
            </div>

            <div className="input-group">
              <label htmlFor="newpasswordConfirm">새 비밀번호 확인</label>
              <input
                id="newpasswordConfirm"
                type="password"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                placeholder="새 비밀번호를 다시 입력하세요"
              />
            </div>

            {error && <div className="error">{error}</div>}

            <button type="button" className="repassword-submit" onClick={handlePasswordChange}>
              재설정 완료
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RePasswordPopup;
