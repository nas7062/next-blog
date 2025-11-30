"use client";
import { FollowButton } from "@/src/app/_components/FollowButton";
import { IUser } from "@/src/app/_components/PostDetail";
import { getFollowInfo } from "@/src/app/_lib/getFollowInfo";
import { useCurrentUser } from "@/src/app/hook/useCurrentUser";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function FollowingPage() {
  const id = usePathname().split("/")[1];
  const { user: user, isLoading: isUserLoading } = useCurrentUser({
    id,
  });
  const [following, setFollowing] = useState<IUser[] | undefined>([]);
  const [followingCount, setFollowingCount] = useState(0);
  useEffect(() => {
    if (!id) return;
    const fetchFollow = async () => {
      const data = await getFollowInfo(id);
      if (data?.followings) setFollowing(data?.followings);
      if (data?.followingCount) setFollowingCount(data?.followingCount);
    };
    fetchFollow();
  }, [id]);
  if (isUserLoading) return "loading...";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2  items-center">
        <Image
          src={user?.image ? user?.image : "/hello.png"}
          alt="유저 이미지"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>{user?.name}</div>
        <ChevronRight />
        <div>{user?.descript}</div>
      </div>
      <h2>{followingCount}명을 팔로워 중</h2>
      {following?.map((follow) => (
        <div key={follow.id}>
          <div className="flex gap-4 ">
            <Image
              src={follow?.image ? follow.image : "/hello.png"}
              alt="유저 이미지"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <div>{follow.name}</div>
              <div>{follow.descript}</div>
            </div>
            <div className="ml-auto">
              <FollowButton userId={user?.id} targetId={follow.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
