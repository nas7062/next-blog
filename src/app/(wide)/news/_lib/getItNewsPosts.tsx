import { fetchITNews, ItPost } from "./fetchITNews";

export async function getItNewsPosts(keyword?: string): Promise<ItPost[]> {
  return fetchITNews(keyword, 80);
}
