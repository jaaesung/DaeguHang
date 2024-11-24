import React, { useState } from "react";
import axios from "axios";

const UpdatePasswordForm = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // 비밀번호 변경 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    try {
      const response = await axios.put(
        "http://localhost:8080/api/users/update-password", // Spring Boot 비밀번호 변경 엔드포인트
        passwordData
      );
      setResponseMessage("비밀번호 변경 성공! 변경된 정보: " + JSON.stringify(response.data));
    } catch (error) {
      setResponseMessage(
        "비밀번호 변경 실패: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div>
      <h1>비밀번호 변경</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="oldPassword">기존 비밀번호:</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">새 비밀번호:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">비밀번호 변경</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdatePasswordForm;
