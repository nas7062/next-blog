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
import { useSession } from "next-auth/react";
import ReppleForm from "../(narrow)/[name]/[postId]/_components/ReppleForm";
import { getCommentsByPost } from "../(narrow)/[name]/[postId]/_lib/getComment";
import { toast } from "sonner";
import ReppleList from "../(narrow)/[name]/[postId]/_components/ReppleList";
import { deleteComment } from "../(narrow)/[name]/[postId]/_lib/deleteComment";
import { Heart } from "lucide-react";
import { useLike } from "../hook/useLike";
import { useToggleLike } from "../hook/useToggleLike";
import LoginModal from "./LoginModal";
import clsx from "clsx";

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

export interface IRepple {
  id: number;
  postId: number | null;
  content: string | null;
  name: string | null;
  userid?: string | null;
  createdAt: string;
  updatedat?: string | null;
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
  const [userData, setUserData] = useState<IUser | null>(null);
  const [repple, setRepple] = useState<IRepple[] | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(post?.likeCount || 0);
  const { data: session } = useSession();

  const email = userData?.email as string;
  const postNumericId = post?.id as number;

  // 좋아요 상태 조회
  const { data: likeData } = useLike(postNumericId, email);
  const liked = likeData?.liked ?? false;
  const toggleLike = useToggleLike(email, postNumericId);

  // 게시글 정보 조회
  useEffect(() => {
    if (!postId) return;

    const getPostId = async () => {
      const data = await getPostById(postId);
      if (!data) {
        router.back();
        return;
      }
      setPost(data);
      if (typeof data.likeCount === "number") {
        setLikeCount(data.likeCount);
      }
    };

    getPostId();
  }, [postId, pathname, router]);

  // 글쓴이 정보 조회
  useEffect(() => {
    const postEmail = post?.email;
    if (!postEmail) return;

    const getUser = async () => {
      const data = await getUserInfo(postEmail);
      setUser(data);
    };
    getUser();
  }, [post?.email]);

  // 현재 로그인 유저 정보 조회
  useEffect(() => {
    const sessionEmail = session?.user?.email;
    if (!sessionEmail) return;

    const getUserData = async () => {
      const data = await getUserInfo(sessionEmail);
      setUserData(data);
    };
    getUserData();
  }, [session?.user?.email]);

  // 댓글 조회 (postId 변경 시에만)
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await getCommentsByPost(Number(postId));
        setRepple(response);
      } catch (error) {
        console.error(error);
        toast.error("댓글을 불러오는데 실패했습니다.");
      }
    };

    if (postId) {
      fetchComment();
    }
  }, [postId]);

  const onDelete = async (id: number) => {
    try {
      const response = await deleteComment(id);
      if (!response) {
        setRepple((prev) => (prev ? prev.filter((r) => r.id !== id) : prev));
        toast.success("댓글 삭제 완료");
      }
    } catch (error) {
      console.error(error);
      toast.error("댓글 삭제 실패");
    }
  };

  const handleToggleLike = () => {
    if (!email) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!postNumericId) return;

    toggleLike.mutate(undefined, {
      onSuccess: (data: any) => {
        setLikeCount(data.likeCount);
      },
      onError: () => {
        toast.error("좋아요 처리에 실패했습니다.");
      },
    });
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
                className="cursor-pointer text-gray-500 hover:text-green-500"
                onClick={() => router.push(`/write?id=${postId}`)}
              >
                수정
              </p>
              <p
                className="cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => router.push(`/${name}/${postId}/delete`)}
              >
                삭제
              </p>
            </div>
          ) : (
            <div className="flex gap-1">
              <button className="text-green-400 border border-green-400 bg-primary rounded-xl px-2 py-1 cursor-pointer hover:bg-green-500 hover:text-white transition-colors duration-300">
                팔로우
              </button>
              <button
                onClick={handleToggleLike}
                className="flex gap-1 border border-gray-300 px-2 py-1 rounded-lg lg:hidden"
              >
                <Heart
                  className={clsx(
                    liked
                      ? "text-rose-500 fill-rose-500"
                      : "text-gray-500 fill-transparent"
                  )}
                  fill={liked ? "currentColor" : "none"}
                  strokeWidth={liked ? 1.75 : 2}
                />
                <p>{likeCount}</p>
              </button>
            </div>
          )}
        </div>
        <div
          className="wmde-markdown wmde-markdown-color
                 bg-background text-foreground"
        >
          <Viewer content={post?.description || ""} />
        </div>
      </div>

      <ReppleForm
        user={userData}
        postId={postId}
        reppleCount={repple?.length}
        onCreated={(newRepple: IRepple) => {
          setRepple((prev) => (prev ? [newRepple, ...prev] : [newRepple]));
        }}
      />
      <ReppleList repples={repple} user={userData} onDelete={onDelete} />

      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </div>
  );
}
