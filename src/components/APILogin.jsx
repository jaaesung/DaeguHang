import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    loginId: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 요청 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login", // Spring Boot의 로그인 엔드포인트
        credentials
      );
      // 로그인 성공 응답 처리
      setResponseMessage(`로그인 성공! 사용자 정보: ${JSON.stringify(response.data)}`);
    } catch (error) {
      // 로그인 실패 응답 처리
      setResponseMessage("로그인 실패: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginId">아이디:</label>
          <input
            type="text"
            id="loginId"
            name="loginId"
            value={credentials.loginId}
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
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Login;
