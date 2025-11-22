"use client";

import { useToggleLike } from "@/src/app/_lib/postToggleLike";
import { useLike } from "@/src/app/hook/useLike";
import { Heart, Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function ActionButtons() {
  const pathname = usePathname();
  const postId = Number(pathname.split("/")[2]);
  const { data: session } = useSession();
  const email = session?.user?.email as string;
  const { data, isLoading } = useLike(postId, email);
  const toggleLike = useToggleLike(email, postId);
  const liked = data?.liked ?? false;

  // const handleToggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  //   if (!email) return;

  //   const willLike = !liked;

  //   toggleLike.mutate(undefined, {
  //     onSuccess: (data) => {
  //       setLikeCount(data.likeCount);
  //     },
  //     onError: () => {
  //       // 서버 실패 시 likeCount 롤백
  //       setLikeCount((prev) => prev - (willLike ? 1 : -1));
  //     },
  //   });
  // };

  return (
    <div className="flex flex-col h-44 w-20 rounded-4xl justify-between items-center py-2 text-primary bg-green-400 border border-green-400">
      <div className="w-14 h-14  rounded-full flex justify-center items-center border border-primary cursor-pointer group ">
        {liked ? (
          <Heart className="w-8 h-8 group-hover:fill-gray-500 fill-red-500" />
        ) : (
          <Heart className="w-8 h-8 group-hover:fill-red-500" />
        )}
      </div>
      <p className="text-lg font-semibold">1</p>
      <div className="w-14 h-14  rounded-full flex justify-center items-center border border-primary group  cursor-pointer">
        <Share2 className="w-8 h-8  group-hover:fill-black" />
      </div>
    </div>
  );
}
