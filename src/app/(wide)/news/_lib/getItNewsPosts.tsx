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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL 환경 변수가 설정되지 않았습니다.");
  }

  const res = await fetch(`${baseUrl}/api/news?${params.toString()}`, {
    next: { revalidate: 60 * 10 }, // 10분마다 재검증
  });

  if (!res.ok) return [];
  return res.json();
}
