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
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">ITWorld 최신 글</h1>

      <ul className="space-y-4">
        {posts.map((p, idx) => (
          <li
            key={`${p.link}-${p.title}-${idx}`}
            className="border rounded-lg p-4 hover:shadow-sm transition"
          >
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold hover:underline"
            >
              {p.title}
            </a>
            <div className="text-sm text-gray-500 mt-1">
              {new Date(p.date).toLocaleString()} · {p.source}
            </div>
            {p.summary && (
              <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                {p.summary}
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
