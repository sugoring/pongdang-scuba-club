import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 다크모드 감지 및 비활성화
const forceLightMode = () => {
  // 다크모드 무효화를 위한 JavaScript
  document.documentElement.style.colorScheme = "light";
  document.documentElement.style.backgroundColor = "#ffffff";
  document.documentElement.style.color = "#1d1d1f";
  document.body.style.backgroundColor = "#ffffff";
  document.body.style.color = "#1d1d1f";

  // meta 태그 추가
  const metaColorScheme = document.createElement("meta");
  metaColorScheme.name = "color-scheme";
  metaColorScheme.content = "light only";
  document.head.appendChild(metaColorScheme);

  const metaSupportedSchemes = document.createElement("meta");
  metaSupportedSchemes.name = "supported-color-schemes";
  metaSupportedSchemes.content = "light only";
  document.head.appendChild(metaSupportedSchemes);

  // 모든 강제 스타일 방지
  document.documentElement.setAttribute("data-force-color-scheme", "light");

  // CSS 변수 강제 적용
  document.documentElement.style.setProperty(
    "--background-color",
    "#ffffff",
    "important"
  );
  document.documentElement.style.setProperty(
    "--text-color",
    "#1d1d1f",
    "important"
  );
  document.documentElement.style.setProperty(
    "--secondary-color",
    "#86868b",
    "important"
  );
  document.documentElement.style.setProperty(
    "--light-background",
    "#f5f9fd",
    "important"
  );
  document.documentElement.style.setProperty(
    "--footer-background",
    "#fbfbfd",
    "important"
  );
};

// 초기 실행 및 다크모드 변경 감지
forceLightMode();
if (window.matchMedia) {
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  darkModeMediaQuery.addEventListener("change", forceLightMode);
}

// DOM이 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 다크모드 감지 재실행 (DOM 로드 후)
  forceLightMode();

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

  // MutationObserver를 사용하여 DOM 변경 감지 및 라이트 모드 강제 적용
  setupDarkModeObserver();
});

// DOM 변경 감지 및 라이트 모드 강제 적용
function setupDarkModeObserver() {
  // 다크모드 관련 속성이나 클래스가 변경되는지 관찰
  const observer = new MutationObserver((mutations) => {
    let needsForceLightMode = false;

    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        (mutation.attributeName === "class" ||
          mutation.attributeName === "style" ||
          mutation.attributeName === "data-theme")
      ) {
        needsForceLightMode = true;
        break;
      }
    }

    if (needsForceLightMode) {
      forceLightMode();
    }
  });

  // 문서 전체와 body 요소 관찰
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "style", "data-theme"],
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class", "style", "data-theme"],
  });
}

// 검색 엔진 메타 태그 설정 함수
function setupSearchEngineMeta() {
  // Google 검색 엔진 인증 태그 추가
  const googleMeta = document.createElement("meta");
  googleMeta.name = "google-site-verification";
  googleMeta.content = "hc4GzRqVd75nG-TG00f74DbtpelQ425_aUfAYFTbEFA";
  document.head.appendChild(googleMeta);

  // 네이버 서치어드바이저 인증 태그 추가
  const naverMeta = document.createElement("meta");
  naverMeta.name = "naver-site-verification";
  naverMeta.content = "692f519e06cd140f805d94b2aa98d3c43cf7110a";
  document.head.appendChild(naverMeta);

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

// 이미지 로딩 이벤트 처리
window.addEventListener("load", () => {
  // lazy 로딩 이미지 로드 완료 시 클래스 추가
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", function () {
        this.classList.add("loaded");
      });
    }
  });

  // 다크모드 비활성화 재적용
  forceLightMode();
});

// 페이지 가시성 변경 시 성능 최적화
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    // 사용자가 페이지를 떠날 때 무거운 작업 중지
    document.title = "강원대학교 스쿠버다이빙 동아리 퐁당 - 돌아오세요!";
  } else {
    // 사용자가 페이지로 돌아왔을 때 원래 제목 복원
    document.title =
      "강원대학교 스쿠버다이빙 동아리 퐁당 | 춘천 스쿠버 | 강원대 스쿠버동아리";

    // 다크모드 비활성화 재적용
    forceLightMode();
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
