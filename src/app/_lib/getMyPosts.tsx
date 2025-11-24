import { getSupabaseClient } from "../api/supabase";

export async function getMyPost(userEmail: string, tag?: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .eq("email", userEmail);

  if (error) {
    console.error("데이터 패칭 실패", error);
    return [];
  }

  // tag가 있을 경우, 각 포스트의 tags 배열을 확인하고 필터링
  if (tag) {
    return data.filter((post) => post.Tags && post.Tags.includes(tag));
  }

  return data; // tag가 없으면 전체 포스트 반환
}
