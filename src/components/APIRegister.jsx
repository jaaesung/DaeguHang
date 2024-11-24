import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    userLoginId: "",
    password: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // 입력 변경 핸들러
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 회원가입 요청 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 동작 방지

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register", // Spring Boot 회원가입 엔드포인트
        formData
      );
      // 성공 응답 처리
      setResponseMessage("회원가입 성공! 환영합니다.");
    } catch (error) {
      // 실패 응답 처리
      setResponseMessage(
        "회원가입 실패: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">이름:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="userLoginId">아이디:</label>
          <input
            type="text"
            id="userLoginId"
            name="userLoginId"
            value={formData.userLoginId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Register;
