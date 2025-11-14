import { supabase } from "../api/supabase";

export async function postToggleLike(userId: string, postId: number) {
  if (!userId || !postId) return;

  // 1. 기존 like 배열 가져오기
  const { data: user, error: selectError } = await supabase
    .from("users")
    .select("like")
    .eq("id", userId)
    .single();

  if (selectError) {
    console.error("like 조회 오류", selectError);
    return null;
  }

  //2.유저 like column 가져옴.
  const currentLikes: number[] = user.like || [];

  // 3. 토글 처리
  let updatedLikes;
  if (currentLikes.includes(postId)) {
    // 좋아요 취소
    updatedLikes = currentLikes.filter((id) => id !== postId);
  } else {
    // 좋아요 추가
    updatedLikes = [...currentLikes, postId];
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

  return data;
}
