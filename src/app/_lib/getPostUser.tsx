import { supabase } from "../api/supabase";

export async function getPostUser(postId: number) {
  const { data, error } = await supabase
    .from("Post")
    .select("email")
    .eq("id", postId);

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("email", data?.[0].email);
  if (!user?.[0]) return [];
  if (error) {
    console.error("데이터 패칭 실패", error);
    return null;
  }

  return { user: user?.[0] };
}
