import { getSupabaseClient } from "../api/supabase";

export async function getFollowCounts(userId: string) {
  if (!userId) return null;
  const supabase = getSupabaseClient();

  // 내가 팔로우하는 사람 수 (following)
  const { count: followingCount, error: followingError } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true }) // data는 안 가져오고 count만
    .eq("follower_id", userId);

  if (followingError) {
    console.error("팔로잉 수 조회 오류", followingError);
    return null;
  }

  // 나를 팔로우하는 사람 수 (follower)
  const { count: followerCount, error: followerError } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);

  if (followerError) {
    console.error("팔로워 수 조회 오류", followerError);
    return null;
  }

  return {
    followerCount: followerCount ?? 0,
    followingCount: followingCount ?? 0,
  };
}
