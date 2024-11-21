import React, { useState } from "react";

const Mypage = () => {
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const itemsPerPage = 3; // 페이지당 항목 수
  const plans = [
    { title: "이월드 벚꽃놀이", date: "2024.10.31", image: "https://via.placeholder.com/320x320" },
    { title: "동성로 맛집투어", date: "2024.11.03", image: "https://via.placeholder.com/320x320" },
    { title: "김광석 거리", date: "2024.11.04", image: "https://via.placeholder.com/320x320" },
    { title: "수성못 산책", date: "2024.11.05", image: "https://via.placeholder.com/320x320" },
    { title: "팔공산 단풍구경", date: "2024.11.06", image: "https://via.placeholder.com/320x320" },
  ];

  const totalPages = Math.ceil(plans.length / itemsPerPage);

  // 페이지 이동 핸들러
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 현재 페이지에 해당하는 항목들만 필터링
  const displayedPlans = plans.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div style={{ width: 1920, height: 1080, position: "relative", background: "#FEF7FF", borderRadius: 18, overflow: "hidden", border: "8px #CAC4D0 solid" }}>
      {/* 상단 바 */}
      <div style={{
        width: '100%',
        height: 56,
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#FEF7FF",
        boxShadow: "0px 0.5936920642852783px 0px rgba(0, 0, 0, 0.15)",
        padding: "0 20px",
        boxSizing: "border-box"
      }}>
        <div style={{ width: 120, height: 40, background: "#2C2C2C", borderRadius: 30, display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: 16 }}>
          대구행
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ width: 120, height: 40, background: "#2C2C2C", borderRadius: 30, display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: 16 }}>
            로그아웃
          </div>
          <div style={{ width: 120, height: 40, background: "#2C2C2C", borderRadius: 30, display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: 16 }}>
            회원가입
          </div>
        </div>
      </div>

      {/* 메인 영역 */}
      <div style={{ width: 1603, height: 1200, left: 317, top: 56, position: "absolute", background: "#F5E1C8" }} />

      {/* 내 정보 섹션 */}
      <div style={{ position: "absolute", left: 60, top: 120, fontSize: 32, fontWeight: "500", color: "black" }}>
        내 정보
      </div>
      <div style={{ position: "absolute", left: 400, top: 150, width: 200, height: 200, backgroundColor: "#C4C4C4", borderRadius: 10 }} />
      <div style={{ position: "absolute", left: 650, top: 160, fontSize: 50, fontWeight: "500", color: "black" }}>
        '대구행'님 안녕하세요!
      </div>
      <div style={{
        position: "absolute", left: 650, top: 300, width: 200, height: 40, backgroundColor: "#2C2C2C", borderRadius: 30, display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: 16
      }}>
        비밀번호 변경
      </div>

      {/* 계획 목록 */}
      <div style={{ position: "absolute", left: 317, top: 450, width: 1800, height: 700, backgroundColor: "#FBC4A4", borderRadius: 20 }}>
        {/* 왼쪽 버튼 */}
        <div style={{
          position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", cursor: "pointer", fontSize: 40, color: "black"
        }} onClick={handlePrevPage}>
          ◀
        </div>
        {/* 오른쪽 버튼 */}
        <div style={{
          position: "absolute", top: "50%", right: 210, transform: "translateY(-50%)", cursor: "pointer", fontSize: 40, color: "black"
        }} onClick={handleNextPage}>
          ▶
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 40, height: "100%" }}>
          {displayedPlans.map((plan, index) => (
            <div key={index} style={{ width: 320, height: 320, top: 160, left: -80, position: "relative", borderRadius: 30, textAlign: "center" }}>
              <img style={{ width: "100%", height: "100%", borderRadius: "30px" }} src={plan.image} alt={plan.title} />
              <div style={{ fontSize: 32, fontWeight: "500", color: "black", marginTop: 10 }}>{plan.title}</div>
              <div style={{ fontSize: 20, color: "black" }}>{plan.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
