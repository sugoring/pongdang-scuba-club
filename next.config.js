/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 성능 최적화
  swcMinify: true,

  // 정적 최적화
  optimizeFonts: true,

  // 이미지 최적화
  images: {
    domains: ["pongdang-coral.vercel.app"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // 웹팩 설정
  webpack: (config, { isServer }) => {
    // SVG 최적화
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // 이미지 최적화
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/i,
      use: [
        {
          loader: "image-webpack-loader",
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            optipng: {
              enabled: true,
            },
            pngquant: {
              quality: [0.65, 0.9],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    });

    return config;
  },

  // SEO 관련 헤더
  async headers() {
    return [
      {
        source: "/(.*)",
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

  // 리다이렉트 설정
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/#intro",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/#gallery",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/#contact",
        permanent: true,
      },
    ];
  },

  // 리라이트 설정
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },

  // 정적 생성 최적화
  trailingSlash: false,

  // 컴파일러 옵션
  compiler: {
    // 사용하지 않는 코드 제거
    removeConsole: process.env.NODE_ENV === "production",
  },

  // i18n 설정
  i18n: {
    locales: ["ko"],
    defaultLocale: "ko",
  },

  // 실험적 기능
  experimental: {
    // 자동 인라인 폰트 (Cumulative Layout Shift 감소)
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
    // 중첩된 레이아웃
    esmExternals: true,
    // 서버 컴포넌트
    serverComponents: false,
  },
};

module.exports = nextConfig;
