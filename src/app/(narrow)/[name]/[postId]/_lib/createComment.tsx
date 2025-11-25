import { getSupabaseClient } from "@/src/app/api/supabase";

export async function createComment({
  postId,
  content,
  name,
}: {
  postId: number;
  content: string;
  name: string;
}) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("Repple")
    .insert({
      postId,
      content,
      name,
      createdAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
