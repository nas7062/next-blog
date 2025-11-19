import { supabase } from "../api/supabase";

export async function getToggleLike(postId: number, email: string) {
  if (!postId || !email) return;

  const { data, error } = await supabase
    .from("users")
    .select("like")
    .eq("email", email);

  if (error) return;

  return data.like?.includes(postId) ?? false;
}
