import { supabase } from "../api/supabase";

export async function getToggleLike(postId: number) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .contains("like", [postId]);

  if (error) {
    console.error("데이터 패칭 실패", error);
    return [];
  }

  return data[0];
}
