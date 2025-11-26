import { useQuery } from "@tanstack/react-query";
import type { IRepple } from "../_components/PostDetail";
import { getCommentsByPost } from "../(narrow)/[name]/[postId]/_lib/getComment";

type UseCurrentUserResult = {
  comments: IRepple[] | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export function useGetComment(postId?: number): UseCurrentUserResult {
  const query = useQuery<IRepple[] | null, Error>({
    queryKey: ["comments", postId],
    enabled: !!postId,
    queryFn: async () => {
      if (!postId) return [];
      const result = await getCommentsByPost(postId);
      return result ?? [];
    },
    staleTime: 1000 * 60, // 1분 동안 fresh
  });
  return {
    comments: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ?? null,
  };
}
