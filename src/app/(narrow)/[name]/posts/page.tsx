import Image from "next/image";
import nextImage from "@/public/nextImage.png";
import SinglePostList from "@/src/app/_components/SinglePostList";
export default function PostPage() {
  return (
    <div className="bg-white flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center gap-4 p-20 border-b border-gray-200">
          <Image
            src={nextImage}
            alt="이미지"
            className="rounded-full w-32 h-32"
          />
          <p className="text-4xl">username</p>
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
      <SinglePostList />
    </div>
  );
}
