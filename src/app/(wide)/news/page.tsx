import Link from "next/link";

// app/it/itworld/page.tsx
type ItPost = {
  title: string;
  link: string;
  date: string;
  summary: string;
  source: string;
};

async function getItNewsPosts(keyword?: string): Promise<ItPost[]> {
  const params = new URLSearchParams();
  if (keyword) params.set("q", keyword);
  params.set("limit", "80");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/news?${params.toString()}`,
    {
      // 서버 컴포넌트면 이렇게 캐시 전략 가능
      next: { revalidate: 60 * 10 }, // 10분마다 재검증
    }
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function ItNewsPage() {
  // 여기서 원하는 키워드를 하드코딩하거나, 나중에 검색 UI랑 연결
  const posts = await getItNewsPosts();

  return (
    <main className=" mx-auto py-10 text-primary flex flex-col gap-10 ">
      <h1 className="text-2xl font-bold mb-6">IT 최신 뉴스</h1>

      <ul className=" grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((p, idx) => (
          <li
            key={`${p.link}-${p.title}-${idx}`}
            className=" rounded-lg p-4 shadow-lg hover:shadow-xl transition hover:-translate-y-2 duration-300 "
          >
            <Link
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold hover:underline"
            >
              {p.title}
            </Link>
            <div className="text-sm text-gray-400 mt-1">
              {new Date(p.date).toLocaleString()} · {p.source}
            </div>
            {p.summary && (
              <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                {p.summary}
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
