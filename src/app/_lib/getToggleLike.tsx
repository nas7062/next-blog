import { supabase } from "../api/supabase";

export async function getToggleLike(postId: number, userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("like")
    .eq("id", userId)
    .single();
  console.log(data, userId, postId);
  if (error) return false;

  return data.like?.includes(postId) ?? false;
}
