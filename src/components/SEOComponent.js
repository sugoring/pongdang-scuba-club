import React from "react";
import { Helmet } from "react-helmet";

// 구조화된 데이터 정의
// 이 데이터들은 모두 SEO 컴포넌트 내부로 이동시켜 App.js에서 분리함
const SEOComponent = ({ siteUrl, baseUrl }) => {
  // 구조화된 데이터 (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "퐁당 - 강원대학교 스쿠버 다이빙 중앙동아리",
    url: "https://pongdang-coral.vercel.app",
    logo: "/logo.png",
    description:
      "강원대학교 중앙동아리 퐁당은 수영 실력과 상관없이 스쿠버 다이빙을 배울 수 있는 춘천 유일의 다이빙 동아리입니다. 자체 강사 보유, 바다 투어 진행.",
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
    keywords:
      "강원대 스쿠버, 춘천 스쿠버다이빙, 강원대 중앙동아리, 오픈워터, 스킨스쿠버 교육",
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
          text: "네, 수영 실력은 스쿠버 다이빙과 별개입니다. 강원대 동아리 퐁당에서는 초보자도 안전하게 다이빙을 즐길 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "퐁당 동아리는 자체 강사가 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 동아리 내 전문 강사를 통해 저렴하게 오픈워터 자격증을 취득하고 체계적인 교육을 받을 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "실제 바다에서 다이빙 체험도 가능한가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "강원도 동해안에서 방학 중 실제 바다 다이빙 실습을 진행하며 잊지 못할 추억을 만들 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "강원대학교 학생이 아니어도 가입할 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "아니요, 퐁당 동아리는 강원대학교 춘천캠퍼스 재학생만 가입 가능합니다.",
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
      {
        "@type": "Question",
        name: "스쿠버다이빙 장비는 직접 구매해야 하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "아니요, 동아리에서 기본적인 장비를 제공합니다. 개인 장비는 점차적으로 구매하시면 됩니다.",
        },
      },
      {
        "@type": "Question",
        name: "춘천에서 스쿠버다이빙을 배울 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 강원대학교 퐁당은 춘천에서 이론 교육과 K26 다이빙풀장에서 실습을 진행하며, 방학에는 동해안에서 바다 실습을 합니다.",
        },
      },
    ],
  };

  // 지역 비즈니스 구조화된 데이터
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "퐁당 - 강원대학교 스쿠버 다이빙 중앙동아리",
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
    keywords: "강원대 스쿠버, 춘천 스쿠버다이빙, 스킨스쿠버, 스쿠버 교육",
  };

  // 코스 제공 구조화된 데이터
  const courseData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "강원대 스쿠버 다이빙 초급 과정",
    description:
      "강원대학교 재학생을 위한 스쿠버 다이빙 입문 과정입니다. 이론부터 실전까지 체계적으로 배울 수 있으며 오픈워터 자격증 취득이 가능합니다.",
    provider: {
      "@type": "Organization",
      name: "퐁당 - 강원대학교 스쿠버 다이빙 중앙동아리",
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
    keywords:
      "오픈워터, 스쿠버다이빙 교육, 스킨스쿠버, 수영 못해도 OK, 춘천 스쿠버, 강원대 다이빙",
  };

  // 브레드크럼 구조화된 데이터
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

  // 스포츠 클럽 구조화된 데이터
  const sportsClubData = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    name: "퐁당 - 강원대학교 스쿠버 다이빙 중앙동아리",
    sport: "스쿠버다이빙",
    url: "https://pongdang-coral.vercel.app",
    logo: "/logo.png",
    image: "/assets/pic1.jpg",
    description:
      "강원대학교 중앙동아리 퐁당은 춘천에서 스쿠버 다이빙을 배울 수 있는 동아리입니다. 수영 실력과 상관없이 참여할 수 있으며, 오픈워터 자격증 취득도 가능합니다.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "춘천시",
      addressRegion: "강원특별자치도",
      addressCountry: "KR",
      streetAddress: "강원대학교 한울관 208호",
      postalCode: "24341",
    },
    membershipRequirements: "강원대학교 재학생만 가입 가능",
    keywords:
      "강원대 스쿠버, 춘천 스쿠버다이빙, 강원대 동아리, 중앙동아리, 스킨스쿠버",
  };

  return (
    <Helmet>
      {/* 기본 메타 태그 - 키워드 최적화 */}
      <title>
        강원대학교 스쿠버다이빙 동아리 퐁당 | 춘천 스쿠버 | 강원대 중앙동아리
      </title>
      <meta
        name="description"
        content="강원대학교 춘천캠퍼스 중앙동아리 퐁당입니다. 수영 못해도 OK! 자체 강사 보유, 바다 투어 진행, 저렴한 자격증 취득까지 가능한 스쿠버다이빙 동아리입니다."
      />
      <meta
        name="keywords"
        content="강원대학교, 강원대, 강원대 동아리, 강원대 중앙동아리, 강원대 스쿠버, 춘천 스쿠버, 춘천 스쿠버다이빙, 강원도 스쿠버다이빙, 퐁당, 다이빙 동아리, 스쿠버 자격증, 오픈워터, 스킨스쿠버, 수영 못해도 OK, 스쿠버 체험, 스쿠버 교육, 바다 투어"
      />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="language" content="Korean" />
      <meta
        name="author"
        content="퐁당 - 강원대학교 스쿠버 다이빙 중앙동아리"
      />
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

      {/* 오픈 그래프 태그 - 최적화 */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta
        property="og:title"
        content="강원대학교 스쿠버다이빙 동아리 퐁당 | 강원대 중앙동아리 | 춘천 스쿠버"
      />
      <meta
        property="og:description"
        content="강원대학교 중앙동아리 퐁당에서 스쿠버다이빙을 배워보세요! 수영 실력 상관없이 참여 가능, 자체 강사 보유, 바다 투어까지!"
      />
      <meta property="og:image" content={`${siteUrl}/assets/pic1.jpg`} />
      <meta
        property="og:image:alt"
        content="강원대학교 스쿠버 다이빙 중앙동아리 퐁당 단체 사진"
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
        content="강원대학교 스쿠버다이빙 동아리 퐁당 | 춘천 스쿠버 | 강원대 중앙동아리"
      />
      <meta
        name="twitter:description"
        content="강원대학교 중앙동아리 퐁당에서 스쿠버다이빙을 배워보세요! 수영 실력 상관없이 참여 가능, 자체 강사 보유, 바다 투어까지!"
      />
      <meta name="twitter:image" content={`${siteUrl}/assets/pic1.jpg`} />
      <meta
        name="twitter:image:alt"
        content="강원대학교 스쿠버 다이빙 중앙동아리 퐁당 단체 사진"
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
  );
};

export default SEOComponent;
