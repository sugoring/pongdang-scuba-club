import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 웹 성능 측정
reportWebVitals(sendToAnalytics);

// 애널리틱스 이벤트 추적 (Google Analytics 등)
function sendToAnalytics(metric) {
  // 애널리틱스 서비스를 사용하는 경우 여기에 측정 데이터 전송 코드 작성
  if (process.env.NODE_ENV !== "development") {
    // console.log(metric); // 프로덕션 환경에서는 실제 애널리틱스 서비스로 데이터 전송

    // Google Analytics 이벤트 추적 예시
    if (window.gtag) {
      window.gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: metric.name,
        value: Math.round(metric.value),
        non_interaction: true,
      });
    }
  }
}

// Google Analytics 설정 (필요한 경우)
if (
  process.env.REACT_APP_GA_MEASUREMENT_ID &&
  process.env.NODE_ENV === "production"
) {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", process.env.REACT_APP_GA_MEASUREMENT_ID);
  window.gtag = gtag;
}

// 참고: 검색엔진 인증 메타 태그 및 사이트맵은 SEOComponent.js로 이동되었습니다.
// React Helmet을 통해 통합 관리하여 중복 방지 및 효율성 향상
