"use client";

import Image from "next/image";
import nextImage from "@/public/nextImage.png";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TagList from "./TagList";
import { IPost } from "./PostList";
import { useSession } from "next-auth/react";

export default function SinglePost({ post }: { post: IPost }) {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const { data: user } = useSession();
  const MovePostDetail = (postId: number) => {
    router.push(`/${user?.user?.name}/${postId}`);
  };

  return (
    <div
      className="flex flex-col w-3xl  gap-4 pb-4 rounded-md cursor-pointer"
      onClick={() => MovePostDetail(post.id)}
      key={post.id}
    >
      <div>
        <Image
          src={post.coverImgUrl || nextImage}
          alt={post.title}
          width={768}
          height={400}
          className="rounded-md "
        />
      </div>
      <div></div>
      <div className="max-w-[740px] px-4 flex flex-col justify-around min-h-32">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="whitespace-normal wrap-break-word line-clamp-5">
          {post.description}
        </p>
        <TagList tags={["react", "nextjs", "프론트엔드"]} />
        <div className="flex gap-4">
          <p>{dayjs(new Date()).format("YYYY년 MM월 DD일")}</p>
          <p>1개의 댓글</p>
        </div>
      </div>
    </div>
  );
}
