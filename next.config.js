/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel에서 자동 이미지 최적화
  images: {
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
  },
  // SEO를 위한 헤더 최적화
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  // Vercel에서 자동 리다이렉트
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
  // 정적 생성 최적화
  trailingSlash: false,
  compiler: {
    // 사용하지 않는 코드 제거
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
