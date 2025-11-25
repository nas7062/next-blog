import { getSupabaseClient } from "../api/supabase";

export async function postToggleLike(userEmail: string, postId: number) {
  if (!userEmail || !postId) return;
  const supabase = getSupabaseClient();
  // 1. 기존 like 배열 가져오기
  const { data: user, error: selectError } = await supabase
    .from("users")
    .select("like")
    .eq("email", userEmail)
    .single();

  if (selectError) {
    console.error("like 조회 오류", selectError);
    return [];
  }

  //2.유저 like column 가져옴.
  const currentLikes: number[] = user.like || [];
  const isLike = currentLikes.includes(postId);

  // post의 likeCount 가져오기
  const { data: post, error: postError } = await supabase
    .from("Post")
    .select("likeCount")
    .eq("id", postId)
    .single();

  const prevCount = (post as any)?.likeCount || 0;
  const newCount = isLike ? Math.max(prevCount - 1, 0) : prevCount + 1;

  // 3. Post 테이블 likeCount 업데이트
  const { error: updatePostError } = await supabase
    .from("Post")
    .update({ likeCount: newCount })
    .eq("id", postId);

  if (updatePostError) {
    console.error("post 업데이트 오류", updatePostError);
    throw updatePostError;
  }

  // 4. users 테이블 like 배열 업데이트
  const updatedLikes = isLike
    ? currentLikes.filter((id) => id !== postId)
    : [...currentLikes, postId];

  const { error: updateUserError } = await supabase
    .from("users")
    .update({ like: updatedLikes })
    .eq("email", userEmail);

  if (updateUserError) {
    console.error("like 업데이트 오류", updateUserError);
    throw updateUserError;
  }

  return {
    likeCount: newCount,
  };
}
