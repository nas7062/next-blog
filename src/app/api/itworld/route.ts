import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

const ITWORLD_RSS = 'https://www.itworld.co.kr/rss/all.xml';

// item 타입 좀 넉넉하게
type ItWorldItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  contentSnippet?: string;
};

const parser: Parser<{}, ItWorldItem> = new Parser();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('q'); // /api/itworld?q=AI 이런 식으로 쓰는 파라미터

    const feed = await parser.parseURL(ITWORLD_RSS);

    let items = feed.items.map((item) => ({
      title: item.title ?? '',
      link: item.link ?? '',
      date: item.pubDate || item.isoDate || '',
      summary: item.contentSnippet ?? '',
      source: feed.title ?? 'ITWorld Korea',
    }));

    // 키워드 필터 (옵션)
    if (keyword && keyword.trim().length > 0) {
      const q = keyword.toLowerCase();
      items = items.filter((item) => {
        const title = item.title.toLowerCase();
        const summary = item.summary.toLowerCase();
        return title.includes(q) || summary.includes(q);
      });
    }

    // 최신순 정렬 (pubDate 기준)
    items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    // 필요하면 상위 N개만
    const limit = Number(searchParams.get('limit') ?? 20);
    const sliced = items.slice(0, limit);

    return NextResponse.json(sliced);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'failed to load itworld rss' },
      { status: 500 },
    );
  }
}
