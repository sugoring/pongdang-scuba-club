import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// DOM이 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 루트 엘리먼트 가져오기
  const rootElement = document.getElementById("root");

  // React 18의 새로운 createRoot API 사용
  const root = createRoot(rootElement);

  // 애플리케이션 렌더링
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // 성능 측정 및 분석
  reportWebVitals(sendToAnalytics);

  // 웹 바이탈 지표를 애널리틱스로 전송
  function sendToAnalytics(metric) {
    if (process.env.NODE_ENV !== "development") {
      // 프로덕션 환경에서만 애널리틱스 전송
      const { id, name, value, delta } = metric;

      // Google Analytics 4 이벤트 전송 (구성되어 있는 경우)
      if (window.gtag) {
        window.gtag("event", name, {
          event_category: "Web Vitals",
          event_label: id,
          value: Math.round(name === "CLS" ? value * 1000 : value), // CLS 값 조정
          non_interaction: true, // 바운스 레이트에 영향 없음
          metric_id: id,
          metric_value: value,
          metric_delta: delta,
        });
      }
    }
  }

  // 검색 엔진 메타 태그 설정
  setupSearchEngineMeta();
});

// 검색 엔진 메타 태그 설정 함수
function setupSearchEngineMeta() {
  // 검색 엔진 인증 태그 추가
  if (process.env.REACT_APP_GOOGLE_VERIFICATION) {
    const meta = document.createElement("meta");
    meta.name = "google-site-verification";
    meta.content = process.env.REACT_APP_GOOGLE_VERIFICATION;
    document.head.appendChild(meta);
  }

  // 네이버 서치어드바이저 인증 태그 추가
  if (process.env.REACT_APP_NAVER_VERIFICATION) {
    const naverMeta = document.createElement("meta");
    naverMeta.name = "naver-site-verification";
    naverMeta.content = process.env.REACT_APP_NAVER_VERIFICATION;
    document.head.appendChild(naverMeta);
  } else {
    // 하드코딩된 네이버 인증 태그 (환경 변수가 없는 경우)
    const naverMetaFallback = document.createElement("meta");
    naverMetaFallback.name = "naver-site-verification";
    naverMetaFallback.content = "692f519e06cd140f805d94b2aa98d3c43cf7110a";
    document.head.appendChild(naverMetaFallback);
  }

  // 사이트맵 링크 추가
  const sitemapLink = document.createElement("link");
  sitemapLink.rel = "sitemap";
  sitemapLink.type = "application/xml";
  sitemapLink.href = "/sitemap.xml";
  document.head.appendChild(sitemapLink);

  // Open Graph 기본 이미지 메타 태그 추가
  updateOgImage();
}

// Open Graph 이미지 메타 태그 업데이트
function updateOgImage() {
  const ogImageMeta = document.querySelector('meta[property="og:image"]');

  if (!ogImageMeta) {
    const meta = document.createElement("meta");
    meta.property = "og:image";
    meta.content = window.location.origin + "/assets/pic1.jpg";
    document.head.appendChild(meta);
  } else if (!ogImageMeta.content.includes("http")) {
    // 상대 경로를 절대 URL로 변환
    ogImageMeta.content = window.location.origin + ogImageMeta.content;
  }
}

// 페이지 가시성 변경 시 성능 최적화
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    // 사용자가 페이지를 떠날 때 무거운 작업 중지
    document.title = "강원대학교 스쿠버다이빙 동아리 퐁당 - 돌아오세요!";
  } else {
    // 사용자가 페이지로 돌아왔을 때 원래 제목 복원
    document.title = "퐁당 - 강원대학교 스쿠버 다이빙 동아리 | 춘천 스쿠버";

    // 리소스 다시 로드 또는 필요한 작업 재개
  }
});

// 서비스 워커 등록 (PWA 지원)
if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker 등록 성공:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker 등록 실패:", error);
      });
  });
}

// 브라우저가 사이트를 사전 렌더링하는지 확인
if (
  navigator.userAgent.includes("Chrome-Lighthouse") ||
  navigator.userAgent.includes("Googlebot") ||
  navigator.userAgent.includes("YetiBot")
) {
  console.log("검색 엔진 봇 감지됨");
  // 검색 엔진 봇에게 더 많은 콘텐츠 표시
  document.documentElement.classList.add("bot-view");
}
