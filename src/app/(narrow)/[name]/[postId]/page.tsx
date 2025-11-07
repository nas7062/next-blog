"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useRouter } from "next/navigation";
import { use } from "react";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const Tags = ["nextjs", "react", "프론트엔드"];
export default function SignlePostPage({
  params,
}: {
  params: Promise<{ name: string; postId: string }>;
}) {
  const { name, postId } = use(params);
  console.log(name, postId);
  const router = useRouter();
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
            <p
              className="cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => router.push("/write")}
            >
              수정
            </p>
            <p
              className="cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => router.push("/nas7062/123/delete")}
            >
              삭제
            </p>
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
      <div>
        useMutation useMutation은 데이터를 변경(C,U,D)하는 작업에 사용됨.
        useMutation은 아래와 같은 인자를 가지고있음. mutationFn 필수적으로
        사용하며,비동기 작업을 수행하고 반환한다. 즉 여기서 실행될
        api요청(?)함수를 넣으면된다. onMutate mutation 함수가 실행되기 전에
        실행되며 mutation 함수가 받을 동일한 변수가 전달됩니다. mutation 함수가
        성공하기를 바라며 리소스에 대한 optimistic update 를 수행하는데
        유용합니다. 이 함수에서 반환된 값은 mutation 실패 시 onError 및
        onSettled 함수 모두에 전달되며 optimistic update 를 롤백하는데 유용하다.
        onSuccess,OnError,onSettled onSuccess는 성공했을때,OnError는
        실패,OnSettled는 성공 혹은 실패일 때 모두 겨로가가 전달된다.
      </div>
    </div>
  );
}
