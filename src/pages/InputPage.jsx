import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";
import TravelTitle from "../components/TravelTitle";
import DateSelector from "../components/DateSelector";
import GenderPopup from "../components/GenderPopup";
import AgePopup from "../components/AgePopup";
import BudgetSlider from "../components/BudgetSlider"; // BudgetSlider로 대체
import ClusterPopup from "../components/ClusterPopup";
import "./InputPage.css";

const InputPage = () => {
  const navigate = useNavigate();

  const [showDatePopup, setShowDatePopup] = useState(false);
  const [showGenderPopup, setShowGenderPopup] = useState(false);
  const [showAgePopup, setShowAgePopup] = useState(false);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false); // 예산 팝업을 BudgetSlider로 대체
  const [showClusterPopup, setShowClusterPopup] = useState(true);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedBudgets, setSelectedBudgets] = useState({
    shopping: 0,
    lodging: 0,
    culture: 0,
    dining: 0,
    entertainment: 0,
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [travelTitle, setTravelTitle] = useState("");
  const [selectedCluster, setSelectedCluster] = useState(null);

  const handleSubmit = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      const { shopping, lodging, culture, dining, entertainment } =
        selectedBudgets;
      const clientInfo = {
        cluster: parseInt(selectedCluster),
        userId: parseInt(userId),
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        gender: selectedGender === "남" ? "M" : "F",
        age: parseInt(selectedAge.replace("대", ""), 10),
        spending: {
          "소매/쇼핑": shopping,
          숙박: lodging,
          "스포츠 및 문화": culture,
          외식: dining,
          유흥: entertainment,
        },
        title: travelTitle,
      };

      const responseRecommend = await axios.post(
        "http://127.0.0.1:8080/api/recommendation",
        clientInfo
      );
      

      // API 응답을 RecommendedPlaces 양식으로 변환
      const categorizedPlaces = {
        명소: [],
        식당: [],
        숙소: [],
      };
    
      // console.log("응답 data : ",  itemsArray)
      console.log("응답 data type: ", responseRecommend.data)
      if(typeof responseRecommend.data === 'string'){
        responseRecommend.data = responseRecommend.data.replace(/NaN/g, 'null');
        responseRecommend.data = JSON.parse(responseRecommend.data);
      }
      responseRecommend.data.forEach((item, index) => {
        // 유니코드 디코딩 함수
        const decodeUnicode = (obj) => {
          const jsonString = JSON.stringify(obj); // 객체를 JSON 문자열로 변환
          const decodedString = jsonString.replace(
            /\\u[\dA-Fa-f]{4}/g,
            (match) =>
              String.fromCharCode(parseInt(match.replace("\\u", ""), 16))
          );
          return JSON.parse(decodedString); // 디코딩된 문자열을 다시 객체로 변환
        };

        // item 디코딩
        const decodedItem = decodeUnicode(item);
        const decodedCategory = decodedItem["분류"]?.trim();
        const mappedItem = {
          placeId: index + 1,
          imageURL:
            decodedItem["가게 이미지 URL"] || "https://via.placeholder.com/100",
          name: decodedItem["가맹점명"] || "Unknown Name",
          blogReviews: (() => {
            const reviewText = decodedItem["리뷰 수"] || ""; // null/undefined 방지
            const blogReviewMatch = reviewText.match(/블로그 리뷰\s?([\d,]+)/);
            return blogReviewMatch
              ? parseInt(blogReviewMatch[1].replace(/,/g, ""), 10)
              : 0; // 기본값
          })(),
          visitorReviews: (() => {
            // 별점이 없고 방문자 리뷰만 있는 경우도 고려
            const reviewText = decodedItem["리뷰 수"] || "";
            const visitorReviewMatch =
              decodedItem["별점"]?.match(/방문자 리뷰\s?([\d,]+)/) ||
              reviewText.match(/방문자 리뷰\s?([\d,]+)/);
            return visitorReviewMatch
              ? parseInt(visitorReviewMatch[1].replace(/,/g, ""), 10)
              : 0; // 기본값
          })(),
          rate: (() => {
            const ratingText = decodedItem["별점"] || ""; // null/undefined 방지
            const ratingMatch = ratingText.match(/([\d.]+)점/); // 별점 값 추출
            if (ratingMatch) {
              return parseFloat(ratingMatch[1]).toFixed(1); // 유효한 별점 반환
            }

            // 별점이 없고 방문자 리뷰만 있는 경우
            const visitorReviewMatch =
              ratingText.match(/방문자 리뷰\s?([\d,]+)/);
            if (visitorReviewMatch) {
              return null; // 별점 대신 null 반환
            }

            return null; // 기본값
          })(),
          latitude: parseFloat(decodedItem["위도"]) || 0.0,
          longitude: parseFloat(decodedItem["경도"]) || 0.0,
          searchUrl: decodedItem["위치값 주소"] || "#",
          // 타입을 여기서 구분하는게 아니라 그냥 넣기만 하고있으니까 여기서 ㄱ부누 해
          type : decodedCategory,
        };

   

        if (decodedCategory === "맛집") {
          categorizedPlaces.식당.push(mappedItem);
        } else if (decodedCategory === "모텔" || decodedCategory === "호텔") {
          categorizedPlaces.숙소.push(mappedItem);
        } else {
          categorizedPlaces.명소.push(mappedItem);
        }
      });



    
      // PlanPage로 이동 (planId 포함)
      navigate("/plan", {
        state: {
          startDate,
          endDate,
          scheduleItems: categorizedPlaces,
          clientInfo : clientInfo
        },
      });
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      alert("계획을 생성하는 도중 오류가 발생했습니다.");
    }
  };

  const handleClusterSelect = (cluster) => {
    setSelectedCluster(cluster);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
  };

  const handleBudgetComplete = (budgets) => {
    setSelectedBudgets(budgets);
    setShowBudgetPopup(false); // 예산 설정 후 팝업 닫기
  };

  const handleTitleChange = (newTitle) => {
    setTravelTitle(newTitle);
  };

  const calculateTotalBudget = () => {
    return Object.values(selectedBudgets).reduce(
      (sum, value) => sum + value,
      0
    );
  };

  return (
    <div className="input-screen">
      <Header />
      <div className="main-content">
        <div className="left-content">
          <TravelTitle title={travelTitle} onChangeTitle={handleTitleChange} />

        <div className="selector-text" onClick={() => setShowDatePopup(true)}>
          날짜:{" "}
          <span>
            {startDate && endDate
              ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
              : "날짜를 선택하세요"}
          </span>
        </div>

        <div className="selector-text" onClick={() => setShowGenderPopup(true)}>
          성별: <span>{selectedGender || "선택되지 않음"}</span>
        </div>

        <div className="selector-text" onClick={() => setShowAgePopup(true)}>
          연령: <span>{selectedAge || "선택되지 않음"}</span>
        </div>

        <div className="selector-text" onClick={() => setShowBudgetPopup(true)}>
          예산 합계:{" "}
          <span>
            {calculateTotalBudget() > 0
              ? `${calculateTotalBudget().toLocaleString()}만원`
              : "선택되지 않음"}
          </span>
        </div>

        <div className="selector-text" onClick={() => setShowClusterPopup(true)}>
          클러스터: <span>{selectedCluster || "선택되지 않음"}</span>
        </div>


          <button className="submit-button" onClick={handleSubmit}>
            계획 생성
          </button>
        </div>

        <div style={{ flex: 1, background: "#F5F5F5" }}>
          <MapDisplay scheduleItems={scheduleItems} />
        </div>
      </div>

      {showClusterPopup && (
        <div className="overlay">
          <ClusterPopup
            selectedCluster={selectedCluster}
            onClusterSelect={handleClusterSelect}
            onNext={() => {
              setShowClusterPopup(false);
              setShowDatePopup(true);
            }}
          />
        </div>
      )}

      {showDatePopup && (
        <div className="overlay">
          <DateSelector
            onDateSelect={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
            onNext={() => {
              setShowDatePopup(false);
              setShowGenderPopup(true);
            }}
          />
        </div>
      )}

      {showGenderPopup && (
        <div className="overlay">
          <GenderPopup
            selectedGender={selectedGender}
            onGenderSelect={handleGenderSelect}
            onNext={() => {
              setShowGenderPopup(false);
              setShowAgePopup(true);
            }}
          />
        </div>
      )}

      {showAgePopup && (
        <div className="overlay">
          <AgePopup
            selectedAge={selectedAge}
            onAgeSelect={handleAgeSelect}
            onNext={() => {
              setShowAgePopup(false);
              setShowBudgetPopup(true); // 예산 팝업을 여는 부분
            }}
          />
        </div>
      )}

      {showBudgetPopup && (
        <div className="overlay">
          <BudgetSlider
            initialBudgets={selectedBudgets}
            onComplete={handleBudgetComplete} // 예산을 설정하고 팝업을 닫는 함수
          />
        </div>
      )}
    </div>
  );
};

export default InputPage;