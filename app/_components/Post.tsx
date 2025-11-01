import { Heart } from "lucide-react";
import Image from "next/image";
import nextImage from "@/public/nextImage.png";
import dayjs from "dayjs";
export default function Post() {
  return (
    <div
      className="flex flex-col w-[350px] shadow-xl gap-4 pb-4 rounded-md
                transition-transform duration-300
                hover:-translate-y-2 hover:shadow-2xl
                cursor-pointer"
    >
      <div>
        <Image
          src={nextImage}
          alt="메인 이미지"
          width={350}
          className="rounded-md"
        />
      </div>
      <div className="max-w-[330px] px-4 flex flex-col justify-around min-h-32">
        <h2 className="text-xl font-semibold">블로그 만들기 후기</h2>
        <p className="whitespace-normal wrap-break-word">
          desriptdesriptdesriptdesriptdesriptdesriptdesriptdesriptdesriptdesriptdesript
        </p>
        <div className="flex gap-4">
          <p>{dayjs(new Date()).format("YYYY년 MM월 DD일")}</p>
          <p>1개의 댓글</p>
        </div>
      </div>
      <div className="flex  items-center gap-2 px-4">
        <Image
          src={nextImage}
          alt="프로필 이미지"
          className="rounded-full w-10 h-10"
        />
        <p className="font-semibold">by 10012</p>
        <div className="ml-auto flex gap-1">
          <Heart fill="" />
          <p>1</p>
        </div>
      </div>
    </div>
  );
}
