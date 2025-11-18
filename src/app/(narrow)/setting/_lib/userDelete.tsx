import { supabase } from "@/src/app/api/supabase";

export async function userDelete(user_id: string) {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", user_id);

  if (error) {
    console.error("데이터 패칭 실패", error);
    return null;
  }

  return data;
}
