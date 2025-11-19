"use client";
import nextImage from "@/public/nextImage.png";
import SinglePostList from "@/src/app/_components/SinglePostList";
import { IPost } from "@/src/app/(wide)/write/page";
import { getMyPost } from "@/src/app/_lib/getMyPosts";
import { useEffect, useState } from "react";
import { IUser } from "@/src/app/_components/PostDetail";
import { usePathname } from "next/navigation";
import { getUserById } from "@/src/app/_lib/getUserById";
import { GithubIcon, MailIcon } from "lucide-react";

export default function PostPage() {
  const id = usePathname().split("/")[1];

  const [userData, setUserData] = useState<IUser>();
  const [posts, setPosts] = useState<IPost[]>();
  const email = userData?.email as string;
  useEffect(() => {
    const fetchPost = async () => {
      const data = await getMyPost(email);
      setPosts(data);
    };
    fetchPost();
  }, [email]);

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      const data = await getUserById(id);
      setUserData(data);
    };
    fetchUser();
  }, [id]);

  return (
    <div className="bg-primary text-primary-foreground flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center gap-4 p-20 border-b border-gray-200">
          <img
            src={userData?.image || nextImage}
            alt="이미지"
            className="rounded-full w-32 h-32"
          />
          <p className="text-4xl">{userData?.name}</p>
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
      <div className="flex justify-center items-center">
        <p className="text-3xl px-4 py-2">글</p>
        <p className="text-3xl px-4 py-2">소개</p>
      </div>
      <SinglePostList posts={posts} />
    </div>
  );
}
