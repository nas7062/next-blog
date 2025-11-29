import { getSupabaseClient } from "../api/supabase";

export async function checkFollow(userId: string, targetId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("follower_id", userId)
    .eq("following_id", targetId);

  if (error) {
    console.error("팔로우 상태 조회 오류", error);
    return null;
  }

  return data && data.length > 0;
}
