import React, { useState } from "react";
import "./RePasswordPopup.css"; // RePasswordPopup.css를 재사용

const NameEditPopup = ({ isOpen, onClose, onSave, currentName }) => {
  const [newName, setNewName] = useState(currentName);

  const handleSave = () => {
    if (newName.trim() === "") {
      alert("이름을 입력해주세요.");
      return;
    }
    onSave(newName); // 부모 컴포넌트에 새 이름 전달
    onClose(); // 팝업 닫기
  };

  if (!isOpen) return null; // 팝업이 닫힌 상태에서는 렌더링하지 않음

  return (
    <div className="repassword-popup-overlay">
      <div className="repassword-popup-container">
        <button className="repassword-close-button" onClick={onClose}>
          ✖
        </button>

        <div className="repassword-form-container">
          <h1>이름 수정</h1>
          <form>
            {/* 현재 이름 */}
            <div className="input-group">
              <label htmlFor="current-name">현재 이름</label>
              <input
                id="current-name"
                type="text"
                value={currentName}
                readOnly
              />
            </div>
            {/* 새 이름 */}
            <div className="input-group">
              <label htmlFor="new-name">새 이름</label>
              <input
                id="new-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="새 이름을 입력하세요"
              />
            </div>
            <button
              type="button"
              className="repassword-submit"
              onClick={handleSave}
            >
              저장
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NameEditPopup;
