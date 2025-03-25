// Web Vitals 라이브러리를 사용하여 웹 성능 지표를 측정하고 보고하는 모듈
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

/**
 * Web Vitals 지표를 측정하고 제공된 콜백 함수에 보고합니다.
 * 각 지표는 측정 완료 시 개별적으로 보고됩니다.
 *
 * @param {Function} onPerfEntry - 성능 지표를 받을 콜백 함수 (선택적)
 *
 * 측정되는 지표:
 * - CLS (Cumulative Layout Shift): 누적 레이아웃 이동
 * - FID (First Input Delay): 최초 입력 지연
 * - FCP (First Contentful Paint): 최초 콘텐츠풀 페인트
 * - LCP (Largest Contentful Paint): 최대 콘텐츠풀 페인트
 * - TTFB (Time to First Byte): 최초 바이트까지의 시간
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    // 브라우저가 성능 측정 API를 지원하는 경우에만 측정 실행
    try {
      // 각 Web Vitals 지표를 측정하고 결과를 콜백 함수에 전달
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    } catch (error) {
      // 에러가 발생한 경우 콘솔에 로깅 (개발 모드에서만)
      if (process.env.NODE_ENV === "development") {
        console.error("Web Vitals 측정 중 오류가 발생했습니다:", error);
      }
    }
  }
};

export default reportWebVitals;
