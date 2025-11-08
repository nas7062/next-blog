import { supabase } from "@/src/app/api/supabase";

export async function getPostById({ postId }: { postId: number }) {
  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .eq("id", postId);
  console.log(data);
  if (error) {
    console.error("postById 패칭 실패", error);
    return;
  }
  console.log("postById 패칭 성공", data);

  return data;
}
