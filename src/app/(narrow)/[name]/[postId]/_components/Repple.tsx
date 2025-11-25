import { IRepple, IUser } from "@/src/app/_components/PostDetail";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function Repple({
  user,
  repple,
}: {
  user: IUser | null;
  repple: IRepple;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <img
          src={user?.image ? user?.image : "/noImage.jpg"}
          alt="댓글 이미지"
          className="w-14 h-14 rounded-full"
        />
        <div className="flex flex-col gap-2">
          <p>{user?.name}</p>
          <p>{dayjs(repple?.updateAt).format("YYYY년 MM월 DD일")}</p>
        </div>
      </div>
      <div>{repple?.content}</div>
    </div>
  );
}
