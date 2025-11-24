import { IUser } from "../_components/PostDetail";
import { supabase } from "../api/supabase";

export async function getUserById(id: string): Promise<IUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle<IUser>();

  if (error) {
    console.error("유저 조회 실패", error);
    return null;
  }

  // data: IUser | null
  return data ?? null;
}
