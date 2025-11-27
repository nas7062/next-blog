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

  const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL ?? "http://localhost:3000"; // 로컬 기본값

  const res = await fetch(`${baseUrl}/api/news?${params.toString()}`, {
    next: { revalidate: 60 * 10 },
  });

  if (!res.ok) return [];
  return res.json();
}
