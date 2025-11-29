import { getSupabaseClient } from "../api/supabase";
import { checkFollow } from "./checkFollow";

export async function deleteFollow(userId: string, targetId: string) {
  if (!userId || !targetId) return;
  const supabase = getSupabaseClient();

  const isFollowing = await checkFollow(userId, targetId);
  if (isFollowing) {
    console.log("이미 팔로우 중입니다.");
    return null;
  }

  // 3. 팔로우가 존재하면 삭제
  const { data: deleteData, error: deleteError } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", userId)
    .eq("following_id", targetId);

  if (deleteError) {
    console.error("언팔로우 오류", deleteError);
    return null;
  }

  return deleteData;
}
