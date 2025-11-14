import { supabase } from "../api/supabase";

export async function getToggleLike(postId: number, userId: string) {
  if (!postId || !userId) return;

  const { data, error } = await supabase
    .from("users")
    .select("like")
    .eq("id", userId);

  if (error) return false;

  return data.like?.includes(postId) ?? false;
}
