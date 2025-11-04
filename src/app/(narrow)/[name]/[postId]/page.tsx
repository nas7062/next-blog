import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const Tags = ["nextjs", "react", "프론트엔드"];
export default function SignlePostPage() {
  const getTimeElapsed = (updatedTime: Date) => {
    return dayjs(updatedTime).fromNow();
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-semibold py-4">[Next.js] Next.js 학습</h2>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="font-semibold">김민석</p>
            <p>{getTimeElapsed(new Date())}</p>
          </div>
          <div className="flex gap-2">
            <p>수정</p>
            <p>삭제</p>
          </div>
        </div>
        <div className="flex gap-2">
          {Tags.map((tag, idx) => (
            <p
              key={idx}
              className="px-4 py-2 text-white rounded-2xl  bg-green-400 hover:bg-green-500 cursor-pointer transition-colors duration-300"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
      <div>descript내용들</div>
    </div>
  );
}
