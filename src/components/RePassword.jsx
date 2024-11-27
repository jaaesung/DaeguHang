import React, { useState } from "react";
import axios from "axios";

const styles = {
  container: {
    width: 1920,
    height: 1080,
    padding: 20,
    background: "#FEF7FF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "8px #CAC4D0 solid",
    borderRadius: 18,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: 50,
    fontSize: 48,
    fontFamily: "Roboto",
    fontWeight: 700,
    color: "#2C2C2C",
    textAlign: "center",
  },
  formContainer: {
    width: 400,
    background: "white",
    borderRadius: 12,
    padding: 30,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
    display: "block",
    color: "#2C2C2C",
  },
  input: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #CAC4D0",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: 12,
    fontSize: 18,
    fontWeight: 700,
    color: "white",
    background: "#2C2C2C",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    background: "#444",
  },
};

const RePassword = () => {
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
    } catch (error) {
      setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>비밀번호 변경</div>
      <div style={styles.formContainer}>
        <div style={styles.inputGroup}>
          <label htmlFor="oldpassword" style={styles.label}>
            기존 비밀번호
          </label>
          <input
            id="oldpassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="기존 비밀번호를 입력하세요"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="newpassword" style={styles.label}>
            새 비밀번호
          </label>
          <input
            id="newpassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호를 입력하세요"
            style={styles.input}
          />
        </div>

        <div style={{ ...styles.inputGroup, marginBottom: 30 }}>
          <label htmlFor="newpasswordConfirm" style={styles.label}>
            새 비밀번호 확인
          </label>
          <input
            id="newpasswordConfirm"
            type="password"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            placeholder="새 비밀번호를 다시 입력하세요"
            style={styles.input}
          />
        </div>

        {error && <div style={{ color: "red", marginBottom: 20 }}>{error}</div>}

        <div>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
            onMouseOut={(e) => (e.target.style.background = styles.button.background)}
            onClick={handlePasswordChange}
          >
            재설정 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default RePassword;
