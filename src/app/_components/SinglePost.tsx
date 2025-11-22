"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import TagList from "./TagList";
import { useSession } from "next-auth/react";
import { IPost } from "../(wide)/write/page";
import { Heart } from "lucide-react";
import { useLike } from "../hook/useLike";
import { useState } from "react";
import { useToggleLike } from "../_lib/postToggleLike";

export default function SinglePost({ post }: { post: IPost }) {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState<number>(post.likeCount || 0);
  const { data: user } = useSession();
  const email = user?.user?.email as string;
  const { data } = useLike(post.id, email);
  const liked = data?.liked ?? false;
  const toggleLike = useToggleLike(email, post.id);
  const handleToggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!email) return;

    const willLike = !liked;

    toggleLike.mutate(undefined, {
      onSuccess: (data: any) => {
        setLikeCount(data.likeCount);
      },
      onError: () => {
        // 서버 실패 시 likeCount 롤백
        setLikeCount((prev) => prev - (willLike ? 1 : -1));
      },
    });
  };

  const MovePostDetail = (postId: number) => {
    router.push(`/${user?.user?.name}/${postId}`);
  };

  if (!post) return;
  return (
    <div
      className="flex flex-col w-3xl  gap-4 pb-4 rounded-md cursor-pointer"
      onClick={() => MovePostDetail(post.id)}
      key={post.id}
    >
      <div>
        <img
          src={post.coverImgUrl || "/nextImage.png"}
          alt={post.title}
          width={708}
          height={400}
          className="rounded-xl overflow-hidden mx-auto"
        />
      </div>
      <div className="max-w-[740px] px-4 flex flex-col justify-around min-h-32 gap-4">
        <p className="text-xl text-primary font-semibold">{post.title}</p>
        <p className="whitespace-normal wrap-break-word line-clamp-5">
          {post.description}
        </p>
        <TagList tags={post.Tags} />
        <div className="flex gap-4 items-center">
          <p>{dayjs(new Date()).format("YYYY년 MM월 DD일")}</p>
          <p>1개의 댓글</p>
          <button onClick={handleToggleLike} className="cursor-pointer">
            {liked ? (
              <Heart className="w-6 h-6 group-hover:fill-gray-500 fill-red-500" />
            ) : (
              <Heart className="w-6 h-6 group-hover:fill-red-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
