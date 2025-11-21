import { useQuery } from "@tanstack/react-query";
import { getToggleLike } from "../_lib/getToggleLike";

export function useLike(postId: number, userEmail: string) {
  return useQuery({
    queryKey: ["like", postId, userEmail],
    queryFn: () => getToggleLike(postId, userEmail),
    enabled: !!postId && !!userEmail, // 둘 다 있어야 쿼리 실행
    // initialData: false,
  });
}
