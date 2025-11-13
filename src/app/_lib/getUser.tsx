import { supabase } from "../api/supabase";

export async function getUserInfo(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId);

  if (error) {
    console.error("데이터 패칭 실패", error);
    return null;
  }
  console.log("데이터 패칭 성공");
  return data[0];
}
