// app/_lib/fetchItNews.ts
import Parser from "rss-parser";

const parser = new Parser();

const FEEDS = [
  "https://toss.tech/rss.xml",
  "https://helloworld.kurly.com/feed.xml",
  "https://www.mediatoday.co.kr/rss/S1N7.xml",
];

export type ItPost = {
  title: string;
  link: string;
  date: string;
  summary: string;
  source: string;
};

type RssItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  contentSnippet?: string;
};

export async function fetchITNews(
  q?: string,
  limit: number = 20
): Promise<ItPost[]> {
  let items: ItPost[] = [];

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
    }
  }

  if (q) {
    const lower = q.toLowerCase();
    items = items.filter((it) => {
      const t = it.title.toLowerCase();
      const s = it.summary.toLowerCase();
      return t.includes(lower) || s.includes(lower);
    });
  }

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return items.slice(0, limit);
}
