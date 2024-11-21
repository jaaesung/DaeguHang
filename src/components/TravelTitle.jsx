import React, { useState } from "react";

const TravelTitle = () => {
  const [title, setTitle] = useState("여행 제목 1");
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleClick = () => setIsEditing(true);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBlur = () => {
    if (title.trim() === "") {
      setTitle("여행 제목 1");
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
            positioin: "sticky",
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
            position: "sticky",
            width: "100%",
          }}
        >
          {title}
        </h1>
      )}
    </div>
  );
};

export default TravelTitle;
