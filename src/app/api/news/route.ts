// app/api/news/route.ts
import { NextRequest, NextResponse } from "next/server";
import Parser from "rss-parser";

export const runtime = "nodejs"; // ✅ rss-parser는 Node 런타임에서 돌려야 안전

const parser = new Parser();

// 실제로 많이 쓰는 피드 예시들
const FEEDS = [
  "https://toss.tech/rss.xml",
  "https://helloworld.kurly.com/feed.xml",
  "https://www.mediatoday.co.kr/rss/S1N7.xml", // 미디어오늘 IT/과학
 
];

type RssItem = {
  title?: string | undefined;
  link?: string | undefined;
  pubDate?: string | undefined;
  isoDate?: string | undefined;
  contentSnippet?: string | undefined;
  
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.toLowerCase();
    const limit = Number(searchParams.get("limit") ?? 20);

    let items: {
      title: string;
      link: string;
      date: string;
      summary: string;
      source: string;
    }[] = [];

    for (const url of FEEDS) {
      try {
        const feed = await parser.parseURL(url);
        feed.items.forEach((item: RssItem) => {
          items.push({
            title: item.title ?? "",
            link: item.link ?? "",
            date: item.pubDate || item.isoDate || "",
            summary: item.contentSnippet ?? "",
            source: feed.title ?? "",
          });
        });
      } catch (e) {
        console.error("RSS fetch/parse error:", url, e);
        // 여기서 그냥 스킵하고 다른 피드 계속 진행
      }
    }

    // 아무 것도 못 가져왔을 때를 대비
    if (items.length === 0) {
      return NextResponse.json(
        { error: "no items parsed from rss" },
        { status: 500 }
      );
    }

    // 키워드 필터
    if (q) {
      items = items.filter((it) => {
        const t = it.title.toLowerCase();
        const s = it.summary.toLowerCase();
        return t.includes(q) || s.includes(q);
      });
    }

    // 날짜 기준 정렬
    items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return NextResponse.json(items.slice(0, limit));
  } catch (err) {
    console.error("API /api/news error:", err);
    return NextResponse.json(
      { error: "failed to load rss" },
      { status: 500 }
    );
  }
}
