import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../_lib/deleteComment";
import { toast } from "sonner";

type DeleteCommentInput = {
  id: number;
  postId: number;
};

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteCommentInput) => deleteComment(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      toast.success("댓글 삭제 완료");
    },
    onError: () => {
      toast.error("댓글 삭제 실패");
    },
  });
}
