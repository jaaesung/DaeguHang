import React, { useState } from "react";

const TravelTitle = ({ title, onChangeTitle }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleClick = () => {
    if (title === "여행 제목을 입력하세요" || !title) {
      onChangeTitle(""); // 기본값일 때 클릭하면 비우기
    }
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    onChangeTitle(newTitle); // 부모 컴포넌트에 변경 사항 전달
  };

  const handleBlur = () => {
    if (!title.trim()) {
      onChangeTitle("여행 제목을 입력하세요"); // 기본값 설정
    }
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          autoFocus
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            border: "none",
            outline: "none",
            width: "100%",
          }}
        />
      ) : (
        <h1
          onClick={handleTitleClick}
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            border: "none",
            outline: "none",
            width: "100%",
            color: title === "여행 제목을 입력하세요" ? "#888" : "#000", // 기본값일 때 회색 표시
          }}
        >
          {title || "여행 제목을 입력하세요"} {/* 기본값 표시 */}
        </h1>
      )}
    </div>
  );
};

export default TravelTitle;
