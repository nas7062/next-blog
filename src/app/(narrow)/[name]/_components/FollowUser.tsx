import { FollowButton } from "@/src/app/_components/FollowButton";
import { IUser } from "@/src/app/_components/PostDetail";
import Image from "next/image";

export default function FollowUser({
  follow,
  user,
}: {
  follow: IUser;
  user: IUser | null;
}) {
  return (
    <div key={follow.id}>
      <div className="flex gap-4 items-center">
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
  );
}
