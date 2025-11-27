import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../_lib/createComment";
import { toast } from "sonner";

type CreateCommentInput = {
  postId: number;
  content: string;
  userid: string;
  name: string;
};

export function useCreateComment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: CreateCommentInput) => createComment(input),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      toast.success("댓글 작성 완료.");
    },
    onError: () => {
      toast.error("댓글 작성 실패");
    },
  });

  return mutation;
}
