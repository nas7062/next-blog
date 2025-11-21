import { QueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "../api/supabase";
import { IUser } from "../_components/PostDetail";

export async function postToggleLike(userEmail: string, postId: number) {
  if (!userEmail || !postId) return;

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

  const { data: post, error: postError } = await supabase
    .from("Post")
    .select("likeCount")
    .eq("id", postId)
    .single();
  const isLike = currentLikes.includes(postId);
  // 3. 토글 처리
  let updatedLikes;
  if (isLike) {
    // 좋아요 취소
    updatedLikes = currentLikes.filter((id) => id !== postId);
    const newCount = post?.likeCount - 1 > 0 ? post?.likeCount - 1 : 0;
    await supabase
      .from("Post")
      .update({ likeCount: newCount })
      .eq("id", postId);
  } else {
    // 좋아요 추가
    updatedLikes = [...currentLikes, postId];
    const newCount = (post?.likeCount || 0) + 1;
    await supabase
      .from("Post")
      .update({ likeCount: newCount })
      .eq("id", postId);
  }

  // 4.해당 유저 updatedLikes 업데이트
  const { data, error } = await supabase
    .from("users")
    .update({ like: updatedLikes })
    .eq("email", userEmail)
    .select();

  if (postError) {
    console.error("post fetch 오류", error);
    return null;
  }

  if (error) {
    console.error("like 업데이트 오류", error);
    return null;
  }
  console.log(data[0], post?.likeCount, isLike);
  return { user: data[0], likeCount: post?.likeCount, isLike };
}

export function useToggleLlike(userEmail: string, postId: number) {
  const queryclinet = new QueryClient();
  return useMutation({
    mutationFn: () => postToggleLike(userEmail, postId),
    onMutate: async () => {
      await queryclinet.cancelQueries(["like", postId, userEmail]);
      const prevData = queryclinet.getQueryData(["like", postId, userEmail]);

      queryclinet.setQueryData(
        ["like", postId, userEmail],
        (user: IUser, likeCount: number, isLike: boolean) => {
          let likeArray: number[] = user.like;
          if (isLike) {
            likeArray = [...likeArray, postId];
            likeCount -= 1;
            isLike = !isLike;
          } else {
            likeArray.filter((item) => item !== postId);
            likeCount += 1;
            isLike = !isLike;
          }
        }
      );
      return { prevData };
    },
    onError: (_err, _variables, context) => {
      // 실패 시 롤백
      if (context?.prevData) {
        queryclinet.setQueryData(["like", postId, userEmail], context.prevData);
      }
    },
    onSettled: () => {
      queryclinet.invalidateQueries(["like", postId, userEmail]);
    },
  });
}
