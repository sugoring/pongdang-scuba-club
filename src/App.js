import React, { useState, useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import "./App.css";

// 성능 최적화: 컴포넌트 외부로 구조화된 데이터 이동
// 구조화된 데이터 (JSON-LD)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "퐁당 - 강원대학교 스쿠버 다이빙 동아리",
  url: "https://pongdang-coral.vercel.app",
  logo: "/logo.png",
  description:
    "강원대학교 스쿠버 다이빙 동아리 퐁당입니다. 강원대학교 춘천 스쿠버 다이빙 동아리입니다.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "춘천시",
    addressRegion: "강원특별자치도",
    addressCountry: "KR",
    streetAddress: "강원대학교 한울관 208호",
    postalCode: "24341",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "http://pf.kakao.com/_thdNxj",
  },
  sameAs: [
    "http://pf.kakao.com/_thdNxj",
    "https://www.instagram.com/pongdang_knu_official",
  ],
};

// FAQ 구조화된 데이터
const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "수영을 못해도 스쿠버 다이빙을 할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 수영 실력은 스쿠버 다이빙과 별개입니다. 초보자도 안전하게 다이빙을 즐길 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "퐁당 동아리는 자체 강사가 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 동아리 내 전문 강사를 통해 저렴하게 자격증을 취득하고 체계적인 교육을 받을 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "실제 바다에서 다이빙 체험도 가능한가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "방학 중 실제 바다에서 다이빙 실습을 진행하며 잊지 못할 추억을 만들 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "강원대학교 학생이 아니어도 가입할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "아니요, 퐁당 동아리는 강원대학교 재학생만 가입 가능합니다.",
      },
    },
    {
      "@type": "Question",
      name: "동아리 회비는 얼마인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "신입 부원 4만원(회비포함), 기존 부원 3만원입니다. 첫 학기만 4만원이며 이후 학기부터는 3만원입니다.",
      },
    },
  ],
};

// 지역 비즈니스 구조화된 데이터 추가
const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "퐁당 - 강원대학교 스쿠버 다이빙 동아리",
  image: "/assets/pic1.jpg",
  "@id": "https://pongdang-coral.vercel.app",
  url: "https://pongdang-coral.vercel.app",
  address: {
    "@type": "PostalAddress",
    streetAddress: "강원대학교 한울관 208호",
    addressLocality: "춘천시",
    addressRegion: "강원특별자치도",
    postalCode: "24341",
    addressCountry: "KR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.8731,
    longitude: 127.7443,
  },
};

// 코스 제공 구조화된 데이터 추가
const courseData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "스쿠버 다이빙 초급 과정",
  description:
    "강원대학교 재학생을 위한 스쿠버 다이빙 입문 과정입니다. 이론부터 실전까지 체계적으로 배울 수 있습니다.",
  provider: {
    "@type": "Organization",
    name: "퐁당 - 강원대학교 스쿠버 다이빙 동아리",
    sameAs: "https://pongdang-coral.vercel.app",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "mixed",
    location: {
      "@type": "Place",
      name: "강원대학교 & K26 다이빙풀장 & 동해안",
      address: {
        "@type": "PostalAddress",
        streetAddress: "강원대학교 한울관 208호",
        addressLocality: "춘천시",
        addressRegion: "강원특별자치도",
        addressCountry: "KR",
      },
    },
  },
};

// 브레드크럼 구조화된 데이터 추가
const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "홈",
      item: "https://pongdang-coral.vercel.app",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "강원대학교 동아리",
      item: "https://pongdang-coral.vercel.app/#intro",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "스쿠버 다이빙",
      item: "https://pongdang-coral.vercel.app/#features",
    },
  ],
};

// 스포츠 클럽 구조화된 데이터 추가 (SEO 강화)
const sportsClubData = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: "퐁당 - 강원대학교 스쿠버 다이빙 동아리",
  sport: "스쿠버다이빙",
  url: "https://pongdang-coral.vercel.app",
  logo: "/logo.png",
  image: "/assets/pic1.jpg",
  description:
    "강원대학교 스쿠버 다이빙 동아리 퐁당입니다. 강원대학교 춘천 스쿠버 다이빙 동아리입니다. 수영 실력과 상관없이 참여할 수 있습니다.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "춘천시",
    addressRegion: "강원특별자치도",
    addressCountry: "KR",
    streetAddress: "강원대학교 한울관 208호",
    postalCode: "24341",
  },
  membershipRequirements: "강원대학교 재학생만 가입 가능",
};

// 이미지 미리 로드를 위한 함수
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// 이미지 로드 완료 이벤트 처리 함수
const handleImageLoaded = (event) => {
  event.target.classList.add("loaded");
};

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const baseUrl = process.env.PUBLIC_URL || "";

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 이미지 미리 로드
  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageUrls = [
          "/assets/pic1.jpg",
          "/assets/pic2.jpg",
          "/assets/pic3.jpg",
          "/assets/pic5.jpg",
        ];

        await Promise.all(imageUrls.map((url) => preloadImage(baseUrl + url)));

        setImagesLoaded(true);
      } catch (error) {
        console.error("이미지 로드 오류:", error);
        setImagesLoaded(true); // 오류가 있어도 계속 진행
      }
    };

    loadImages();
  }, [baseUrl]);

  // 웹사이트 URL 정규화
  const siteUrl = "https://pongdang-coral.vercel.app";

  return (
    <div className="app">
      {/* SEO를 위한 React Helmet */}
      <Helmet>
        {/* 기본 메타 태그 */}
        <title>
          강원대학교 스쿠버다이빙 동아리 퐁당 | 춘천 스쿠버 | 강원대
          스쿠버동아리
        </title>
        <meta
          name="description"
          content="강원대학교 스쿠버 다이빙 동아리 퐁당입니다. 강원대학교 춘천 스쿠버 다이빙 동아리로, 자체 강사 보유 및 바다 투어를 진행합니다."
        />
        <meta
          name="keywords"
          content="강원대학교, 강원대, 강원대 동아리, 스쿠버다이빙, 춘천 스쿠버, 퐁당, 다이빙 동아리, 스쿠버 자격증, 바다 투어, 수중 활동, 강원도 스쿠버다이빙, 춘천 다이빙, 강원대 스쿠버 동아리, 해양 스포츠, 스킨스쿠버, 다이빙 교육, 스쿠버 체험"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="language" content="Korean" />
        <meta name="author" content="퐁당 - 강원대학교 스쿠버 다이빙 동아리" />
        <meta name="geo.region" content="KR-42" />
        <meta name="geo.placename" content="Chuncheon" />
        <meta name="geo.position" content="37.8731;127.7443" />
        <meta name="ICBM" content="37.8731, 127.7443" />
        <link rel="canonical" href={siteUrl} />

        {/* 서치 콘솔 인증 */}
        <meta
          name="naver-site-verification"
          content="692f519e06cd140f805d94b2aa98d3c43cf7110a"
        />
        <meta
          name="google-site-verification"
          content="hc4GzRqVd75nG-TG00f74DbtpelQ425_aUfAYFTbEFA"
        />

        {/* 모바일 최적화 메타 태그 */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
        />
        <meta name="theme-color" content="#0071e3" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="강원대 스쿠버 퐁당" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />

        {/* 오픈 그래프 태그 */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta
          property="og:title"
          content="강원대학교 스쿠버다이빙 동아리 퐁당 | 춘천 최고의 스쿠버 동아리"
        />
        <meta
          property="og:description"
          content="강원대학교 재학생이라면 누구나 참여할 수 있는 강원대학교 스쿠버 다이빙 동아리. 수영 실력 상관없이 참여 가능. 춘천에서 스쿠버다이빙을 시작하세요!"
        />
        <meta property="og:image" content={`${siteUrl}/assets/pic1.jpg`} />
        <meta
          property="og:image:alt"
          content="강원대학교 스쿠버 다이빙 동아리 퐁당 단체 사진"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ko_KR" />
        <meta
          property="og:site_name"
          content="강원대학교 스쿠버다이빙 동아리 퐁당"
        />

        {/* 트위터 카드 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="강원대학교 스쿠버다이빙 동아리 퐁당 | 춘천 최고의 스쿠버 동아리"
        />
        <meta
          name="twitter:description"
          content="강원대학교 재학생이라면 누구나 참여할 수 있는 강원대학교 스쿠버 다이빙 동아리. 수영 실력 상관없이 참여 가능."
        />
        <meta name="twitter:image" content={`${siteUrl}/assets/pic1.jpg`} />
        <meta
          name="twitter:image:alt"
          content="강원대학교 스쿠버 다이빙 동아리 퐁당 단체 사진"
        />

        {/* 구조화된 데이터 */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqData)}</script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessData)}
        </script>
        <script type="application/ld+json">{JSON.stringify(courseData)}</script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(sportsClubData)}
        </script>

        {/* DNS Prefetch 및 리소스 최적화 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* 리소스 프리로드 */}
        <link rel="preload" href={`${baseUrl}/assets/pic1.jpg`} as="image" />
        <link rel="preload" href={`${baseUrl}/logo.png`} as="image" />

        {/* 사이트맵 및 파비콘 */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Helmet>

      {/* SEO를 위한 숨겨진 텍스트 (사용자에게 보이지 않음) */}
      <div className="sr-only" aria-hidden="true">
        <h2>강원대학교 스쿠버 다이빙 동아리 퐁당</h2>
        <p>
          강원대학교 스쿠버 다이빙 동아리 퐁당은 강원대학교 재학생들을 위한
          스쿠버 동아리입니다. 수영을 못하더라도 스쿠버 다이빙을 배울 수 있으며,
          동아리 내 전문 강사진이 체계적인 교육을 제공합니다.
        </p>
        <p>
          동아리 활동은 이론교육, 수영장교육, 바다실습 세 단계로 진행됩니다.
          학기 중에는 이론교육과 K26 다이빙풀장에서의 수영장 교육을, 방학 중에는
          실제 바다에서 다이빙 실습을 진행합니다.
        </p>
        <p>
          동아리 회비는 신입 부원 4만원(회비포함), 기존 부원 3만원입니다. 첫
          학기만 4만원이며 이후 학기부터는 3만원입니다. 동아리방은 한울관
          208호에 위치해 있습니다.
        </p>
        <h3>퐁당 동아리 활동</h3>
        <ul>
          <li>스쿠버 다이빙 기초 이론 교육</li>
          <li>K26 다이빙풀장 실습 훈련</li>
          <li>바다 다이빙 실습</li>
          <li>자격증 취득 과정</li>
        </ul>
        <h3>강원대학교 동아리 활동</h3>
        <p>
          강원대학교 춘천캠퍼스에 위치한 퐁당은 활발한 활동을 펼치고 있는
          동아리로, 수영 실력과 상관없이 스쿠버 다이빙을 배우고 싶은 강원대학교
          재학생이라면 누구나 참여할 수 있습니다.
        </p>
        <h3>연락처 정보</h3>
        <p>
          퐁당 공식 카카오톡 채널: http://pf.kakao.com/_thdNxj 퐁당 공식
          인스타그램: https://www.instagram.com/pongdang_knu_official
        </p>
      </div>

      {/* 메인 컨텐츠 */}
      <main>
        {/* 히어로 섹션 */}
        <header className="hero" id="home">
          <div className="hero-background">
            <img
              src={`${baseUrl}/assets/pic1.jpg`}
              alt="강원대 스쿠버 다이빙 동아리 퐁당 바닷속 단체사진"
              className="hero-bg-image"
              loading="eager"
              width="1920"
              height="1080"
              fetchpriority="high"
              onLoad={handleImageLoaded}
            />
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content fade-in">
            <h1 className="hero-title slide-in">퐁당</h1>
            <p className="hero-tagline slide-in-delayed-1">
              바다에 낭만을 더하다
            </p>
            <p className="hero-subtitle slide-in-delayed-2">
              강원대학교 스쿠버 다이빙 동아리
            </p>
          </div>
        </header>

        {/* 소개 섹션 */}
        <section id="intro" className="intro" aria-labelledby="intro-title">
          <div className="title-container">
            <h2 id="intro-title" className="section-title">
              지금 바로
            </h2>
            <span className="section-title-bold">'퐁당'하세요</span>
          </div>
          <p className="intro-lead">
            지루한 대학생활에서 벗어나,{" "}
            <span className="highlight">새로운 세상</span>을 경험하세요.
          </p>
          <div className="intro-desc-container">
            <p className="intro-desc">
              스쿠버 다이빙은 물속에서 자유롭게 숨을 쉬며 바다를 즐기는
              스포츠입니다.
              <br />
              <br />
              스쿠버 다이빙에 기회가 없었다면, '퐁당'과 함께 하는 건 어떨까요?
            </p>
          </div>
        </section>

        {/* 갤러리 섹션 */}
        <section
          className="gallery"
          id="gallery"
          aria-label="스쿠버 다이빙 활동 갤러리"
        >
          <div className="gallery-container">
            <div className="gallery-item">
              <img
                src={`${baseUrl}/assets/pic3.jpg`}
                alt="강원대 스쿠버 다이빙 동아리 활동 사진 - 해양 생물 관찰"
                loading="lazy"
                width="350"
                height="350"
                onLoad={handleImageLoaded}
              />
            </div>
            <div className="gallery-item">
              <img
                src={`${baseUrl}/assets/pic2.jpg`}
                alt="춘천 스쿠버 다이빙 활동 모습 - 수중 장비 체험"
                loading="lazy"
                width="350"
                height="350"
                onLoad={handleImageLoaded}
              />
            </div>
            <div className="gallery-item">
              <img
                src={`${baseUrl}/assets/pic5.jpg`}
                alt="강원대 퐁당 스쿠버 다이빙 교육 - 안전 교육"
                loading="lazy"
                width="350"
                height="350"
                onLoad={handleImageLoaded}
              />
            </div>
          </div>
        </section>

        {/* 특징 섹션 */}
        <section
          id="features"
          className="features"
          aria-labelledby="features-title"
        >
          <div className="title-container">
            <h2 id="features-title" className="section-title">
              퐁당의
            </h2>
            <span className="section-title-bold">특별함</span>
          </div>

          <div className="feature-cards">
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                🏊‍♂️
              </div>
              <h3>수영 못해도 OK!</h3>
              <p>
                수영 실력은 스쿠버 다이빙과 별개입니다. 초보자도 안전하게
                다이빙을 즐길 수 있습니다.
              </p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                👨‍🏫
              </div>
              <h3>자체 강사 보유</h3>
              <p>
                동아리 내 전문 강사를 통해 저렴하게 자격증을 취득하고 체계적인
                교육을 받을 수 있습니다.
              </p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                🏖️
              </div>
              <h3>바다 투어 진행</h3>
              <p>
                방학 중 실제 바다에서 다이빙 실습을 진행하며 잊지 못할 추억을
                만들 수 있습니다.
              </p>
            </article>
          </div>
        </section>

        {/* 인용구 섹션 */}
        <section className="quote-section">
          <div className="quote-container">
            <blockquote className="quote-text">
              "지루한 대학생활에서 벗어나, <br /> 지구 표면의 70%를 차지하는
              바다를 탐험해보세요!"
            </blockquote>
          </div>
        </section>

        {/* 연락처 섹션 */}
        <section
          id="contact"
          className="contact-info"
          aria-labelledby="contact-title"
        >
          <div className="title-container">
            <h2 id="contact-title" className="section-title">
              퐁당과
            </h2>
            <span className="section-title-bold">함께하세요</span>
          </div>

          <div className="contact-socials">
            <a
              href="http://pf.kakao.com/_thdNxj"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button kakao-button"
              aria-label="강원대 퐁당 카카오톡 채널로 이동"
            >
              카카오톡
            </a>
            <a
              href="https://www.instagram.com/pongdang_knu_official?igsh=YTRyZXdpY3Y3Nnox"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button instagram-button"
              aria-label="강원대 퐁당 인스타그램 페이지로 이동"
            >
              인스타그램
            </a>
          </div>
        </section>
      </main>

      {/* 푸터 섹션 */}
      <footer>
        <div className="footer-content">
          <p className="copyright">
            © 2025 강원대학교 스쿠버 다이빙 동아리 '퐁당'
          </p>
          <p className="address">
            <a
              href="https://map.naver.com/p/search/%EA%B0%95%EC%9B%90%EB%8C%80%ED%95%99%EA%B5%90%20%ED%95%9C%EC%9A%B8%EA%B4%80"
              target="_blank"
              rel="noopener noreferrer"
              className="address-link"
              aria-label="강원대학교 한울관 위치 지도 보기"
            >
              강원특별자치도 춘천시 강원대학길 1 한울관 208호
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
