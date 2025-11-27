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

  const res = await fetch(`/api/news?${params.toString()}`, {
    next: { revalidate: 60 * 10 }, // 10분마다 재검증
  });

  if (!res.ok) return [];
  return res.json();
}
