import { useQuery } from "@tanstack/react-query";
import { supabase } from "../api/supabase";

export async function getToggleLike(postId: number, userEmail: string | null) {
  // postId나 userEmail이 없으면 false 반환 undefined나 nulㅣ 반환 안되게
  if (!postId || !userEmail) {
    return { liked: false };
  }

  const { data, error } = await supabase
    .from("users")
    .select("like")
    .eq("email", userEmail)
    .single();
  if (error) {
    console.error("getToggleLike error:", error);
    return { liked: false };

    // 에러를 react-query까지 올리고 싶으면:
    // throw error;
  }

  // like가 null/undefined일 수도 있으니 안전하게 처리
  const likeArray = (data as any)?.like as number[] | null | undefined;

  return { liked: !!likeArray?.includes(postId) };
}

export function useLike(postId: number | null, userEmail: string | null) {
  return useQuery({
    queryKey: ["like", postId, userEmail],
    queryFn: () => getToggleLike(postId as number, userEmail),
    enabled: !!postId && !!userEmail, // 둘 다 있어야 쿼리 실행
    staleTime: 1000 * 60 * 5,
    // initialData: false,
  });
}
