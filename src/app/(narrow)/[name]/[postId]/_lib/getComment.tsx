import { getSupabaseClient } from "@/src/app/api/supabase";

export async function getCommentsByPost(postId: number) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("Repple")
    .select("*")
    .eq("postId", postId)
    .order("createdAt", { ascending: true });

  if (error) throw error;
  return data; // 댓글 배열
}
