import { getSupabaseClient } from "../api/supabase";

export async function createFollow(userId: string, targetId: string) {
  if (!userId || !targetId) return;
  const supabase = getSupabaseClient();
  // 1. 기존 like 배열 가져오기
  const { data, error: insertError } = await supabase
    .from("follows")
    .insert({ follower_id: userId, following_id: targetId });
  if (insertError) {
    console.error("like 조회 오류", insertError);
    return null;
  }

  return data;
}
