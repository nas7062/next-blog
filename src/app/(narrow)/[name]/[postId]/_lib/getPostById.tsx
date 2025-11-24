import { getSupabaseClient } from "@/src/app/api/supabase";

export async function getPostById(postId: number) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .eq("id", Number(postId));

  if (error) {
    console.error("postById 패칭 실패", error);
    return;
  }

  return data[0];
}
