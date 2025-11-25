import { getSupabaseClient } from "@/src/app/api/supabase";
import { TagRow } from "../@sidebar/page";

export async function getTagList(email: string): Promise<TagRow[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("Post")
    .select("Tags")
    .eq("email", email);

  if (error) {
    console.error("태그 조회 실패", error);
    return [];
  }

  return (data ?? []) as unknown as TagRow[];
}
