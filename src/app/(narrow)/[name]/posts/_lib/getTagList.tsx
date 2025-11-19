import { supabase } from "@/src/app/api/supabase";

export async function getTagList(userEmail: string) {
  const { data, error } = await supabase
    .from("Post")
    .select("Tags")
    .eq("email", userEmail);
  if (error) {
    console.error("데이터 패칭 실패", error);
    return [];
  }

  return data;
}
