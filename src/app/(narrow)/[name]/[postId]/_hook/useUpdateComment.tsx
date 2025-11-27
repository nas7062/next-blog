import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../_lib/updateComment";
import { toast } from "sonner";

type UpdateCommentInput = {
  id: number;
  postId: number;
  content: string;
};

export function useUpdateComment(userId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: UpdateCommentInput) => {
      if (!userId) throw new Error("로그인이 필요합니다.");
      return updateComment(id, content, userId);
    },
    onSuccess: (_data, variables) => {
      // 해당 게시글 댓글 목록 다시 불러오기
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      toast.success("댓글 수정 완료");
    },
    onError: () => {
      toast.error("댓글 수정 실패");
    },
  });
}
