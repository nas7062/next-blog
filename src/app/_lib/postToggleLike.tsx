import { supabase } from "../api/supabase";

export async function postToggleLike(userId: string, postId: number) {
  if (!userId || !postId) return;

  // 1. 기존 like 배열 가져오기
  const { data: user, error: selectError } = await supabase
    .from("users")
    .select("like")
    .eq("id", userId);

  if (selectError) {
    console.error("like 조회 오류", selectError);
    return null;
  }

  //2.유저 like column 가져옴.
  const currentLikes: number[] = user.like || [];

  const { data: post, error: postError } = await supabase
    .from("Post")
    .select("likeCount")
    .eq("id", postId);

  // 3. 토글 처리
  let updatedLikes;
  if (currentLikes.includes(postId)) {
    // 좋아요 취소
    updatedLikes = currentLikes.filter((id) => id !== postId);
    const newCount = post.likeCount - 1 > 0 ? post.likeCount - 1 : 0;
    await supabase
      .from("Post")
      .update({ likeCount: newCount })
      .eq("id", postId);
  } else {
    // 좋아요 추가
    updatedLikes = [...currentLikes, postId];
    const newCount = (post.likeCount || 0) + 1;
    await supabase
      .from("Post")
      .update({ likeCount: newCount })
      .eq("id", postId);
  }

  // 4.해당 유저 updatedLikes 업데이트
  const { data, error } = await supabase
    .from("users")
    .update({ like: updatedLikes })
    .eq("id", userId)
    .select();

  if (error) {
    console.error("like 업데이트 오류", error);
    return null;
  }

  if (error) {
    console.error("like 업데이트 오류", error);
    return null;
  }
  return data;
}
