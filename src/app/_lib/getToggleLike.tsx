import { getSupabaseClient } from "../api/supabase";

export async function getToggleLike(postId: number, userEmail: string | null) {
  // postId나 userEmail이 없으면 false 반환 undefined나 null 반환 안되게
  if (!postId || !userEmail) {
    return { liked: false };
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("like")
    .eq("email", userEmail)
    .single();
  if (error) {
    console.error("getToggleLike error:", error);
    return { liked: false };
  }

  // like가 null/undefined일 수도 있으니 안전하게 처리
  const likeArray = (data as any)?.like as number[] | null | undefined;

  return { liked: !!likeArray?.includes(postId) };
}
