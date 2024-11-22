import React, { useState } from 'react';
import { registerUser } from './api'; // 위에서 작성한 API 파일 경로

const Register = () => {
  const [username, setUsername] = useState('');
  const [userLoginId, setUserLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const data = await registerUser(username, userLoginId, password);
      setSuccess(`회원가입 성공! 환영합니다, ${data.loginId}`);
      setError('');
    } catch (error) {
      setError('회원가입 실패: 아이디가 이미 존재합니다.');
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="사용자 이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="아이디"
        value={userLoginId}
        onChange={(e) => setUserLoginId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호 재확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>회원가입</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Register;
