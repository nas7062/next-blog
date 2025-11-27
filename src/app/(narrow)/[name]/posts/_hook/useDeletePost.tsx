import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deletePost } from "../_lib/deletePost";

type DeleteCommentInput = {
  id: number;
};

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteCommentInput) => deletePost(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["posts", variables.id],
      });
      toast.success("글 삭제 완료");
    },
    onError: () => {
      toast.error("글 삭제 실패");
    },
  });
}
