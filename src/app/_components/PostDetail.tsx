"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { getPostById } from "../(narrow)/[name]/[postId]/_lib/getPostById";
import Viewer from "../(wide)/write/_components/View";
import { getUserInfo } from "../_lib/getUser";
import { IPost } from "../(wide)/write/_components/WirtePageClient";
import { useSession } from "next-auth/react";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export interface IUser {
  id: string;
  email: string | null;
  name: string | null;
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
  const { data: session } = useSession();
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

  const textarea = useRef<null>(null);
  const handleResizeHeight = () => {
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current?.scrollHeight + "px";
  };
  const isUpdate = post?.email === session?.user?.email;
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-semibold py-4">{post?.title}</h2>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="font-semibold">{user?.name || "글쓴이"}</p>
            <p>{dayjs(post?.updatedAt).format("YYYY년 MM월 DD일")}</p>
          </div>
          {isUpdate ? (
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
          ) : (
            <button className="text-green-400 border border-green-400 bg-primary rounded-xl px-4 py-1 cursor-pointer hover:bg-green-500 hover:text-white transition-colors duration-300">
              팔로우
            </button>
          )}
        </div>
        <div
          className="wmde-markdown wmde-markdown-color
                 bg-background text-foreground"
        >
          <Viewer content={post?.description || ""} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p>4개의 댓글</p>
        <textarea
          ref={textarea}
          onInput={handleResizeHeight}
          rows={1}
          className="resize-none w-full min-h-16 h-auto bg-slate-200 rounded-lg text-black p-2"
        />
        <button className="ml-auto  border border-green-400  rounded-xl px-4 py-1 cursor-pointer bg-green-500 text-white hover:bg-green-600 transition-colors duration-300">
          댓글 작성
        </button>
      </div>
      <div>
        
      </div>
    </div>
  );
}
