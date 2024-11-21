import React from 'react';

const styles = {
  container: {
    width: 1920,
    height: 1080,
    padding: 20,
    background: '#FEF7FF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '8px #CAC4D0 solid',
    borderRadius: 18,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: 50,
    fontSize: 48,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#2C2C2C',
    textAlign: 'center',
  },
  formContainer: {
    width: 400,
    background: 'white',
    borderRadius: 12,
    padding: 30,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
    display: 'block',
    color: '#2C2C2C',
  },
  input: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #CAC4D0',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: 12,
    fontSize: 18,
    fontWeight: 700,
    color: 'white',
    background: '#2C2C2C',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  buttonHover: {
    background: '#444',
  },
  footerText: {
    marginTop: 30,
    fontSize: 14,
    color: '#79747E',
    textAlign: 'center',
  },
  link: {
    color: '#2C2C2C',
    fontWeight: 500,
  },
};

export default function SignupPage() {
  return (
    <div style={styles.container}>
      {/* 상단 제목 */}
      <div style={styles.title}>비밀번호 변경</div>

      {/* 입력 필드 컨테이너 */}
      <div style={styles.formContainer}>

        {/* 기존 비밀번호 입력 */}
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            기존 비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="기존 비밀번호를 입력하세요"
            style={styles.input}
          />
        </div>

        {/* 바꿀 비밀번호 입력 */}
        <div style={styles.inputGroup}>
          <label htmlFor="newpassword" style={styles.label}>
            바꿀 비밀번호
          </label>
          <input
            id="newpassword"
            type="password"
            placeholder="바꿀 비밀번호를 입력하세요"
            style={styles.input}
          />
        </div>

        {/* 바꿀 비밀번호 확인 */}
        <div style={{ ...styles.inputGroup, marginBottom: 30 }}>
          <label htmlFor="newpasswordConfirm" style={styles.label}>
            바꿀 비밀번호 확인
          </label>
          <input
            id="newpasswordConfirm"
            type="text"
            placeholder="바꿀 비밀번호를 다시 입력하세요"
            style={styles.input}
          />
        </div>

        {/* 회원가입 버튼 */}
        <div>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
            onMouseOut={(e) => (e.target.style.background = styles.button.background)}
          >
            재설정 완료
          </button>
        </div>
      </div>

    </div>
  );
}
