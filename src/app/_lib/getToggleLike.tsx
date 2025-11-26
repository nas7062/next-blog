import { getSupabaseClient } from "../api/supabase";

type ToggleLikeResult = {
  liked: boolean;
  likeCount: number;
};

export async function getToggleLike(
  postId: number,
  userEmail: string | null
): Promise<ToggleLikeResult> {
  if (!postId || !userEmail) {
    return { liked: false, likeCount: 0 };
  }

  const supabase = getSupabaseClient();

  const [
    { data: userData, error: userError },
    { data: postData, error: postError },
  ] = await Promise.all([
    supabase
      .from("users")
      .select("like")
      .eq("email", userEmail)
      .maybeSingle<{ like: number[] | null }>(),
    supabase
      .from("Post")
      .select("likeCount")
      .eq("id", postId)
      .maybeSingle<{ likeCount: number | null }>(),
  ]);

  if (userError) {
    console.error("getToggleLike user error:", userError);
  }

  if (postError) {
    console.error("getToggleLike post error:", postError);
  }

  // 유저의 like 배열 (null/undefined 방어)
  const likeArray = userData?.like ?? [];
  const liked = Array.isArray(likeArray) && likeArray.includes(postId);

  // Post의 likeCount (없으면 0으로 처리)
  const likeCount = postData?.likeCount ?? 0;

  return { liked, likeCount };
}
