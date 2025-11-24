"use client";

import Script from "next/script";

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: "feed" | string;
          content: {
            title: string;
            description: string;
            imageUrl?: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons?: {
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }[];
        }) => void;
      };
    };
  }
}

export default function KakaoInitializer() {
  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
      integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY as string);
        }
        console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
      }}
    />
  );
}
