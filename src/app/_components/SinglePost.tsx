"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import nextImage from "@/public/nextImage.png";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TagList from "./TagList";
export default function SinglePost() {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const MovePostDetail = () => {
    router.push(`/nas7062/123`);
  };
  const MoveUserPosts = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/nas7062/posts`);
  };

  return (
    <div
      className="flex flex-col w-3xl  gap-4 pb-4 rounded-md cursor-pointer"
      onClick={MovePostDetail}
    >
      <div>
        <Image
          src={nextImage}
          alt="메인 이미지"
          width={768}
          className="rounded-md"
        />
      </div>
      <div></div>
      <div className="max-w-[740px] px-4 flex flex-col justify-around min-h-32">
        <h2 className="text-xl font-semibold">블로그 만들기 후기</h2>
        <p className="whitespace-normal wrap-break-word">
          desriptdesriptdesriptdesriptdesriptdesriptdesriptdesriptdesriptdesriptdesript
        </p>
        <TagList tags={["react", "nextjs", "프론트엔드"]} />
        <div className="flex gap-4">
          <p>{dayjs(new Date()).format("YYYY년 MM월 DD일")}</p>
          <p>1개의 댓글</p>
        </div>
      </div>
    </div>
  );
}
