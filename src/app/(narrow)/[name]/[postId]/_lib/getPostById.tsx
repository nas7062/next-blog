import { supabase } from "@/src/app/api/supabase";

export async function getPostById(postId: string) {
  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .eq("id", Number(postId));

  if (error) {
    console.error("postById 패칭 실패", error);
    return;
  }
  console.log("postById 패칭 성공", data);
  console.log(data[0]);
  return data[0];
}
