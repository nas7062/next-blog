import { fetchITNews, ItPost } from "./fetchITNews";

export async function getItNewsPosts(keyword?: string): Promise<ItPost[]> {
  // 빌드 시점에도 그냥 함수 호출일 뿐, localhost HTTP 요청 X
  return fetchITNews(keyword, 80);
}
