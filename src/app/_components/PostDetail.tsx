"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { getPostById } from "../(narrow)/[name]/[postId]/_lib/getPostById";
import { IPost } from "./PostList";
import Viewer from "../(wide)/write/_components/View";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function PostDetail({
  name,
  postId,
}: {
  name: string;
  postId: string;
}) {
  const router = useRouter();
  const [post, setPost] = useState<IPost>();
  useEffect(() => {
    if (!postId) return;
    const getPostId = async () => {
      const data = await getPostById(postId);
      setPost(data);
    };
    getPostId();
  }, [postId]);

  const getTimeElapsed = (updatedTime: Date) => {
    return dayjs(updatedTime).fromNow();
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-semibold py-4">{post?.title}</h2>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="font-semibold">{name}</p>
            <p>{getTimeElapsed(new Date())}</p>
          </div>
          <div className="flex gap-2">
            <p
              className="cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => router.push(`/write?id=${postId}`)}
            >
              수정
            </p>
            <p
              className="cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => router.push(`/${name}/${postId}/delete`)}
            >
              삭제
            </p>
          </div>
        </div>
        <div>
          <Viewer content={post?.description || ""} />
        </div>
      </div>
    </div>
  );
}
