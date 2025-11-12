"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import nextImage from "@/public/nextImage.png";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IPost } from "./PostList";
import { useSession } from "next-auth/react";
export default function Post({ post }: { post: IPost }) {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const { data: user } = useSession();

  const MovePostDetail = (postId: number) => {
    router.push(`/${user?.user?.name}/${postId}`);
  };
  const MoveUserPosts = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/${user?.user?.name}/posts`);
  };

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
        <Image
          src={post.coverImgUrl || nextImage}
          alt={post.title}
          width={350}
          height={200}
          className="rounded-md"
        />
      </div>
      <div className="max-w-[330px] px-4 flex flex-col justify-around min-h-32">
        <h2 className="text-xl font-semibold">{post.title}</h2>
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
          <Image
            src={nextImage}
            width={50}
            height={50}
            alt="프로필 이미지"
            className="rounded-full w-10 h-10"
          />
          <p className="font-semibold">by 10012</p>
        </div>

        <div className="ml-auto flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setClicked((v) => !v);
            }}
            className="cursor-pointer"
          >
            <Heart
              size={22}
              className={
                clicked
                  ? "text-rose-500 fill-rose-500"
                  : "text-gray-500 fill-transparent"
              }
              fill={clicked ? "currentColor" : "none"}
              strokeWidth={clicked ? 1.75 : 2}
            />
          </button>
          <p>1</p>
        </div>
      </div>
    </div>
  );
}
