"use client";
import nextImage from "@/public/nextImage.png";
import SinglePostList from "@/src/app/_components/SinglePostList";
import { IPost } from "@/src/app/(wide)/write/page";
import { getMyPost } from "@/src/app/_lib/getMyPosts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/src/app/_lib/getUser";
import { IUser } from "@/src/app/_components/PostDetail";

export default function PostPage() {
  const { data: user } = useSession();
  const [userData, setUserData] = useState<IUser>();
  const [posts, setPosts] = useState<IPost[]>();
  const email = user?.user?.email as string;
  useEffect(() => {
    const fetchPost = async () => {
      const data = await getMyPost(email);
      setPosts(data);
    };
    fetchPost();
  }, [email]);

  useEffect(() => {
    if (!email) return;
    const fetchUser = async () => {
      const data = await getUserInfo(email);
      setUserData(data);
    };
    fetchUser();
  }, [email]);

  return (
    <div className="bg-primary text-primary-foreground flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center gap-4 p-20 border-b border-gray-200">
          <img
            src={userData?.image || nextImage}
            alt="이미지"
            className="rounded-full w-32 h-32"
          />
          <p className="text-4xl">{user?.user?.name}</p>
        </div>
        <div className="flex justify-end gap-4 py-4">
          <p>0 팔로우</p>
          <p>0 팔로잉</p>
        </div>
        <div className="flex gap-4">
          <p>github</p>
          <p>mail</p>
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
