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

// Google Search Console 인증을 위한 메타 태그 추가
if (process.env.REACT_APP_GOOGLE_VERIFICATION) {
  const meta = document.createElement("meta");
  meta.name = "google-site-verification";
  meta.content = process.env.REACT_APP_GOOGLE_VERIFICATION;
  document.head.appendChild(meta);
}

// Naver Search Advisor 인증을 위한 메타 태그 추가
if (process.env.REACT_APP_NAVER_VERIFICATION) {
  const naverMeta = document.createElement("meta");
  naverMeta.name = "naver-site-verification";
  naverMeta.content = process.env.REACT_APP_NAVER_VERIFICATION;
  document.head.appendChild(naverMeta);
}

// 웹 성능 측정
reportWebVitals(sendToAnalytics);

// 애널리틱스 이벤트 추적 (Google Analytics 등)
function sendToAnalytics(metric) {
  // 애널리틱스 서비스를 사용하는 경우 여기에 측정 데이터 전송 코드 작성
  if (process.env.NODE_ENV !== "development") {
    // console.log(metric); // 프로덕션 환경에서는 실제 애널리틱스 서비스로 데이터 전송
  }
}

// 구조화된 데이터 사이트맵 링크 추가
if (process.env.NODE_ENV === "production") {
  const sitemapLink = document.createElement("link");
  sitemapLink.rel = "sitemap";
  sitemapLink.type = "application/xml";
  sitemapLink.href = "/sitemap.xml";
  document.head.appendChild(sitemapLink);
}
