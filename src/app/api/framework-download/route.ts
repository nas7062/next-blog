// app/api/framework-download/route.ts  (폴더 이름이 framework-download 인 거 기준)

import { NextRequest, NextResponse } from "next/server";

const FRONTEND_PACKAGES = [
  { label: "React", pkg: "react" },
  { label: "Vue", pkg: "vue" },
  { label: "Angular", pkg: "angular" },
  { label: "Svelte", pkg: "svelte" },
  { label: "Next.js", pkg: "next" },
  { label: "Nuxt", pkg: "nuxt" },
];

const BACKEND_PACKAGES = [
  { label: "Express", pkg: "express" },
  { label: "NestJS", pkg: "@nestjs/core" },
  { label: "Fastify", pkg: "fastify" },
  { label: "Koa", pkg: "koa" },
];

const ALLOWED_PERIODS = ["last-day", "last-week", "last-month", "last-year"];

// 개별 패키지 다운로드 수 가져오는 함수
async function fetchDownloads(pkg: string, period: string): Promise<number> {
  const url = `https://api.npmjs.org/downloads/point/${period}/${encodeURIComponent(
    pkg
  )}`;

  try {
    const res = await fetch(url, {
      // 필요하면 캐시
      next: { revalidate: 60 * 60 },
    });

    if (!res.ok) {
      // 디버깅용 로그
      console.error(
        "[NPM API ERROR]",
        pkg,
        period,
        "status:",
        res.status,
        res.statusText
      );
      // 실패하면 0으로 처리 (전체 API가 죽지 않게)
      return 0;
    }

    const json = await res.json();
    // json 예: { downloads: 123456, start: "...", end: "...", package: "react" }
    return typeof json.downloads === "number" ? json.downloads : 0;
  } catch (err) {
    console.error("[NPM FETCH FAIL]", pkg, period, err);
    return 0;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const periodParam = searchParams.get("period");

  const period = ALLOWED_PERIODS.includes(periodParam || "")
    ? (periodParam as (typeof ALLOWED_PERIODS)[number])
    : "last-month";

  try {
    // 프론트엔드 패키지들 병렬 요청
    const frontendDownloads = await Promise.all(
      FRONTEND_PACKAGES.map(async (p) => {
        const downloads = await fetchDownloads(p.pkg, period);
        return {
          name: p.label,
          pkg: p.pkg,
          downloads,
        };
      })
    );

    // 백엔드 패키지들 병렬 요청
    const backendDownloads = await Promise.all(
      BACKEND_PACKAGES.map(async (p) => {
        const downloads = await fetchDownloads(p.pkg, period);
        return {
          name: p.label,
          pkg: p.pkg,
          downloads,
        };
      })
    );

    return NextResponse.json({
      period,
      frontend: frontendDownloads,
      backend: backendDownloads,
    });
  } catch (e) {
    console.error("[API ERROR] /api/framework-download", e);
    return NextResponse.json(
      { error: "Failed to load framework stats" },
      { status: 500 }
    );
  }
}
