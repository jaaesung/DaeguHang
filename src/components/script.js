async function sendRecommendationRequest() {
    const cluster = document.getElementById("cluster").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;

    // 금액 필드 값 읽기
    const shopping = parseFloat(document.getElementById("shopping").value) || 0;
    const lodging = parseFloat(document.getElementById("lodging").value) || 0;
    const culture = parseFloat(document.getElementById("culture").value) || 0;
    const dining = parseFloat(document.getElementById("dining").value) || 0;
    const entertainment = parseFloat(document.getElementById("entertainment").value) || 0;

    // 입력값 검증
    if (!cluster || !age || !gender) {
        alert("모든 필드를 입력하세요.");
        return;
    }

    const payload = {
        cluster: parseInt(cluster),
        age: parseInt(age),
        gender: gender,
        spending: {
            "소매/쇼핑": shopping,
            "숙박": lodging,
            "스포츠 및 문화": culture,
            "외식": dining,
            "유흥": entertainment
        }
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/recommendation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("서버 오류:", errorData);
            alert(`서버 오류: ${errorData.error || "Unknown error"}`);
            return;
        }

        const data = await response.json();
        displayResult(data);
    } catch (error) {
        console.error("네트워크 오류:", error);
        alert("네트워크 오류 발생.");
    }
}

function displayResult(data) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // 이전 결과 초기화

    if (!data || data.length === 0) {
        resultDiv.innerText = "추천 결과가 없습니다.";
        return;
    }

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // 테이블 헤더
    const headers = ["분류", "관광지", "가맹점명", "가게 이미지 URL", "별점", "리뷰 수", "주소", "웹사이트 URL", "유사도"];
    const headerRow = document.createElement("tr");
    headers.forEach((header) => {
        const th = document.createElement("th");
        th.innerText = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // 테이블 데이터
    data.forEach((item) => {
        const row = document.createElement("tr");
        headers.forEach((header) => {
            const td = document.createElement("td");
            if (header === "가게 이미지 URL") {
                td.innerHTML = item[header] ? `<img src="${item[header]}" alt="이미지" width="50">` : "N/A";
            } else {
                td.innerText = item[header] || "N/A";
            }
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    resultDiv.appendChild(table);
}
