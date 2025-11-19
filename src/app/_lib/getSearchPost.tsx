import { supabase } from "../api/supabase";

export async function getSearchPost({ q }: { q?: string }) {
  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .or(`title.ilike.%${q}%,description.ilike.%${q}%`);

  if (error) {
    console.error("데이터 패칭 실패", error);
    return [];
  }
  return data;
}
