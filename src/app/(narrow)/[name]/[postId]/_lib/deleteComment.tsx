import { getSupabaseClient } from "@/src/app/api/supabase";

export async function deleteComment(id: number) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("Repple").delete().eq("id", id);

  if (error) throw error;

  return error;
}
