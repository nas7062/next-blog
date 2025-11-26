import { getSupabaseClient } from "../api/supabase";

export async function getUserInfo(userEmail: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", userEmail)
    .single();

  if (error) {
    console.error("데이터 패칭 실패", error);
    return null;
  }
  return data;
}
