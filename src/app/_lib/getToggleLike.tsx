import { supabase } from "../api/supabase";

export async function getToggleLike(postId: number, userEmail: string) {
  if (!postId || !userEmail) return;

  const { data, error } = await supabase
    .from("users")
    .select("like")
    .eq("email", userEmail)
    .single();

  if (error) return;
  return data.like?.includes(postId) ? true : false;
}
