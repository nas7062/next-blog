"use client";

import { useSession } from "next-auth/react";
import Post from "../../_components/Post";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLikePosts } from "../../hook/useLikePosts";

export default function FeedPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const email = session?.user?.email as string;
  const { posts, isLoading: isPostLoading } = useLikePosts(email);

  if (isPostLoading) return "loading...";
  if (!posts)
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src="/character.png"
          alt="곰 이미지"
          width={300}
          height={300}
          className="w-72 h-72"
        />
        <p>로그인 하고 개인화된 기능을 사용해봐요!</p>
        <button
          onClick={() => router.push("/signin")}
          className="px-4 py-2 bg-green-400 hover:bg-green-500 text-primary rounded-xl cursor-pointer"
        >
          로그인 하기
        </button>
      </div>
    );
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
