import { getSupabaseClient } from "../api/supabase";

export async function getLikePosts(userEmail: string) {
  const supabase = getSupabaseClient();

  const { data: user, error: likeError } = await supabase
    .from("users")
    .select("like")
    .eq("email", userEmail)
    .single();

  if (likeError) {
    console.error("좋아요 정보 패칭 실패", likeError);
    return [];
  }
  const likeIds: number[] = (user?.like as number[]) ?? [];
  if (!likeIds.length) {
    return [];
  }
  const { data: posts, error: postError } = await supabase
    .from("Post")
    .select("*")
    .in("id", likeIds);

  if (postError) {
    console.error("좋아요한 포스트 패칭 실패", postError);
    return [];
  }

  return posts ?? [];
}
