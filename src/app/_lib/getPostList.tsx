import { getSupabaseClient } from "../api/supabase";
import type { IPost } from "../(wide)/write/_components/WirtePageClient";

const PAGE_SIZE = 8;

export async function getPostList(
  page: number,
  pageSize: number = PAGE_SIZE
): Promise<IPost[]> {
  const supabase = getSupabaseClient();

  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .range(from, to)
    .order("createdAt", { ascending: false }); // 정렬 기준은 원하는 컬럼으로 변경

  if (error) {
    console.error("데이터 패칭 실패", error);
    return [];
  }

  return (data as IPost[]) ?? [];
}

export { PAGE_SIZE };
