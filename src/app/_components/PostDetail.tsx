"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { getPostById } from "../(narrow)/[name]/[postId]/_lib/getPostById";
import Viewer from "../(wide)/write/_components/View";
import { getUserInfo } from "../_lib/getUser";
import { IPost } from "../(wide)/write/_components/WirtePageClient";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export interface IUser {
  id: string;
  email: string | null;

  // DB가 name을 nullable로 두었다면:
  name: string | null;

  // image/provider가 null이 올 수 있으면:
  image: string | null;
  provider: string | null;

  created_at: string | null;

  like?: number[] | null;
  descript?: string | null;
}

export default function PostDetail({
  name,
  postId,
}: {
  name: string;
  postId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [post, setPost] = useState<IPost>();
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    if (!postId) return;
    const getPostId = async () => {
      const data = await getPostById(postId);
      if (data === undefined) {
        router.back();
      }
      setPost(data);
    };
    getPostId();
  }, [postId, pathname, router]);

  useEffect(() => {
    const email = post?.email;
    if (!email) return;
    const getUser = async () => {
      const data = await getUserInfo(email);
      setUser(data);
    };
    getUser();
  }, [post?.email]);

  const getTimeElapsed = (updatedTime: Date) => {
    return dayjs(updatedTime).fromNow();
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-semibold py-4">{post?.title}</h2>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="font-semibold">{user?.name || "글쓴이"}</p>
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
        <div
          className="wmde-markdown wmde-markdown-color
                 bg-background text-foreground"
        >
          <Viewer content={post?.description || ""} />
        </div>
      </div>
    </div>
  );
}
