type ItPost = {
  title: string;
  link: string;
  date: string;
  summary: string;
  source: string;
};

export async function getItNewsPosts(keyword?: string): Promise<ItPost[]> {
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
