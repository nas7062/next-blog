import { NextRequest, NextResponse } from "next/server";
import { fetchITNews } from "../../(wide)/news/_lib/fetchITNews";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? undefined;
    const limit = Number(searchParams.get("limit") ?? 20);

    const items = await fetchITNews(q, limit);

    if (items.length === 0) {
      return NextResponse.json(
        { error: "no items parsed from rss" },
        { status: 500 }
      );
    }

    return NextResponse.json(items);
  } catch (err) {
    console.error("API /api/news error:", err);
    return NextResponse.json({ error: "failed to load rss" }, { status: 500 });
  }
}
