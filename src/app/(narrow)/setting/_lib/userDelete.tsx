import { getSupabaseClient } from "@/src/app/api/supabase";

export async function userDelete(userEmail: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("email", userEmail);

  if (error) {
    console.error("데이터 패칭 실패", error);
    return null;
  }

  return data;
}
