"use client";

import SinglePostList from "@/src/app/_components/SinglePostList";
import { getMyPost } from "@/src/app/_lib/getMyPosts";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GithubIcon, MailIcon } from "lucide-react";
import Tabs from "./_components/Tabs";
import { IPost } from "@/src/app/(wide)/write/_components/WirtePageClient";
import { TagSlider } from "./_components/TagSlider";
import { useCurrentUser } from "@/src/app/hook/useCurrentUser";
import Image from "next/image";

export default function PostPage() {
  const id = usePathname().split("/")[1];
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") as string;
  const [posts, setPosts] = useState<IPost[] | []>([]);
  const { user: userData, isLoading: isUserLoading } = useCurrentUser({
    id,
  });
  const email = userData?.email as string;
  useEffect(() => {
    const fetchPost = async () => {
      const data = await getMyPost(email, tag);
      setPosts(data);
    };
    fetchPost();
  }, [email, tag]);
  if (isUserLoading) return "loading...";
  return (
    <div className="bg-primary text-primary-foreground flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-4 p-20 border-b border-gray-200">
          <Image
            src={userData?.image || "/nextImage.png"}
            width={100}
            height={100}
            alt="이미지"
            className="rounded-full w-32 h-32"
          />
          <div className="flex flex-col gap-2">
            <p className="text-4xl">{userData?.name}</p>
            <p className="text-gray-500 ml-2">{userData?.descript}</p>
          </div>
        </div>
        <div className="flex justify-end gap-4 py-4">
          <p>0 팔로우</p>
          <p>0 팔로잉</p>
        </div>
        <div className="flex gap-4">
          <GithubIcon className="w-8 h-8 cursor-pointer" />
          <MailIcon className="w-8 h-8 cursor-pointer" />
        </div>
      </div>
      <Tabs />
      <TagSlider />
      <SinglePostList posts={posts} />
    </div>
  );
}
