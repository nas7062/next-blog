import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getSupabaseClient } from "../api/supabase";

export async function postToggleLike(userEmail: string, postId: number) {
  if (!userEmail || !postId) return;
  const supabase = getSupabaseClient();
  // 1. 기존 like 배열 가져오기
  const { data: user, error: selectError } = await supabase
    .from("users")
    .select("like")
    .eq("email", userEmail)
    .single();

  if (selectError) {
    console.error("like 조회 오류", selectError);
    return [];
  }

  //2.유저 like column 가져옴.
  const currentLikes: number[] = user.like || [];
  const isLike = currentLikes.includes(postId);

  // post의 likeCount 가져오기
  const { data: post, error: postError } = await supabase
    .from("Post")
    .select("likeCount")
    .eq("id", postId)
    .single();

  const prevCount = (post as any)?.likeCount || 0;
  const newCount = isLike ? Math.max(prevCount - 1, 0) : prevCount + 1;

  // 3. Post 테이블 likeCount 업데이트
  const { error: updatePostError } = await supabase
    .from("Post")
    .update({ likeCount: newCount })
    .eq("id", postId);

  if (updatePostError) {
    console.error("post 업데이트 오류", updatePostError);
    throw updatePostError;
  }

  // 4. users 테이블 like 배열 업데이트
  const updatedLikes = isLike
    ? currentLikes.filter((id) => id !== postId)
    : [...currentLikes, postId];

  const { error: updateUserError } = await supabase
    .from("users")
    .update({ like: updatedLikes })
    .eq("email", userEmail);

  if (updateUserError) {
    console.error("like 업데이트 오류", updateUserError);
    throw updateUserError;
  }

  return {
    likeCount: newCount,
  };
}

export function useToggleLike(userEmail: string, postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!userEmail) throw new Error("로그인이 필요합니다.");
      return postToggleLike(userEmail, postId);
    },
    onMutate: async () => {
      // 좋아요 상태 query 취소
      await queryClient.cancelQueries({
        queryKey: ["like", postId, userEmail],
      });

      // 이전 상태 저장
      const prevLiked = queryClient.getQueryData<boolean>([
        "like",
        postId,
        userEmail,
      ]);

      // 낙관적 업데이트: liked 토글
      queryClient.setQueryData<boolean | undefined>(
        ["like", postId, userEmail],
        (old) => !old
      );

      return { prevLiked };
    },
    onError: (_err, _variables, context) => {
      // 실패 시 롤백
      if (context?.prevLiked !== undefined) {
        queryClient.setQueryData(
          ["like", postId, userEmail],
          context.prevLiked
        );
      }
    },
    onSettled: () => {
      // 최종적으로 서버와 동기화
      queryClient.invalidateQueries({
        queryKey: ["like", postId, userEmail],
      });
    },
  });
}
