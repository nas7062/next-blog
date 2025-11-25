import { getSupabaseClient } from "@/src/app/api/supabase";

export async function updateComment(
  id: number,
  content: string,
  userId: string
) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("Repple")
    .update({
      content,
      updatedat: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("userid", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
