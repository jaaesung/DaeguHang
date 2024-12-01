import React, { useState } from "react";
import "./Popup.css";

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
    <div className="popup-overlay">
      <div className="popup">
        <h2 className="popup-title">이름 수정</h2>
        <div className="popup-input-group">
          {/* 현재 이름 표시 */}
          <div className="popup-current-name">
            <label htmlFor="current-name" className="popup-input-label">
              현재 이름:
            </label>
            <input
              id="current-name"
              className="popup-input current-name"
              type="text"
              value={currentName}
              readOnly
            />
          </div>

          {/* 새 이름 입력 */}
          <div className="popup-new-name">
            <label htmlFor="name" className="popup-input-label">
              새 이름:
            </label>
            <input
              id="name"
              className="popup-input"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="새 이름 입력"
            />
          </div>
        </div>
        <div className="popup-button-group">
          <button className="popup-next cancel" onClick={onClose}>
            취소
          </button>
          <button className="popup-next" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameEditPopup;
