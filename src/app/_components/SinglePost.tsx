"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import TagList from "./TagList";
import { useSession } from "next-auth/react";
import { IPost } from "../(wide)/write/page";

export default function SinglePost({ post }: { post: IPost }) {
  const router = useRouter();

  const { data: user } = useSession();
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
        <div className="flex gap-4">
          <p>{dayjs(new Date()).format("YYYY년 MM월 DD일")}</p>
          <p>1개의 댓글</p>
        </div>
      </div>
    </div>
  );
}
