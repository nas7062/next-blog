import { getSupabaseClient } from "@/src/app/api/supabase";

export async function deletePost(id: number) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("Post").delete().eq("id", id);

  if (error) throw error;

  return error;
}
