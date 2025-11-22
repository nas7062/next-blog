"use client";
import { Heart } from "lucide-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IPost } from "../(wide)/write/page";
import { IUser } from "./PostDetail";
import { getPostUser } from "../_lib/getPostUser";
import { useLike } from "../hook/useLike";
import { useToggleLike } from "../_lib/postToggleLike";

export default function Post({ post }: { post: IPost }) {
  const [likeCount, setLikeCount] = useState<number>(post.likeCount || 0);
  const router = useRouter();
  const { data: user } = useSession();
  const email = user?.user?.email as string;
  const { data } = useLike(post.id, email);
  const liked = data?.liked ?? false;
  const toggleLike = useToggleLike(email, post.id);
  const [writeUser, setWriteUser] = useState<IUser>();
  const MovePostDetail = (postId: number) => {
    if (!writeUser) return;
    router.push(`/${writeUser?.name}/${postId}`);
  };
  const MoveUserPosts = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!writeUser) return;
    router.push(`/${writeUser?.id}/posts`);
  };

  useEffect(() => {
    if (!post?.id) return;
    const getUser = async () => {
      const { user } = await getPostUser(post.id);
      setWriteUser(user);
    };

    getUser();
  }, [post?.id]);

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

  if (!writeUser || !post) return;
  return (
    <div
      className="flex flex-col max-w-[350px] shadow-xl gap-4 pb-4 rounded-md
                transition-transform duration-350
                hover:-translate-y-2 hover:shadow-2xl
                cursor-pointer"
      onClick={() => MovePostDetail(post.id)}
      key={post.id}
    >
      <div>
        <img
          src={post.coverImgUrl ? post.coverImgUrl : "/noImage.jpg"}
          alt={post.title}
          width={350}
          height={350}
          className="rounded-md"
        />
      </div>
      <div className="max-w-[330px] px-4 flex flex-col justify-around h-32">
        <p className="text-lg text-primary font-semibold">{post.title}</p>
        <p className="whitespace-normal wrap-break-word line-clamp-5">
          {post.description}
        </p>
        <div className="flex gap-4">
          <p>{dayjs(post.createdAt).format("YYYY년 MM월 DD일")}</p>
          <p>1개의 댓글</p>
        </div>
      </div>
      <div className="flex  items-center gap-2 px-4">
        <div className="flex items-center gap-2" onClick={MoveUserPosts}>
          <img
            src={writeUser?.image ? writeUser?.image : "/nextImage.png"}
            width={50}
            height={50}
            alt="프로필 이미지"
            className="rounded-full w-10 h-10"
          />
          <p className="font-semibold">by {writeUser?.name || "글쓴이"}</p>
        </div>

        <div className="ml-auto flex gap-1">
          <button onClick={handleToggleLike} className="cursor-pointer">
            <Heart
              size={22}
              className={
                liked
                  ? "text-rose-500 fill-rose-500"
                  : "text-gray-500 fill-transparent"
              }
              fill={liked ? "currentColor" : "none"}
              strokeWidth={liked ? 1.75 : 2}
            />
          </button>
          <p>{likeCount}</p>
        </div>
      </div>
    </div>
  );
}
