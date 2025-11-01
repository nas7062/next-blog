import { Search, XCircle } from "lucide-react";
import PostList from "../_components/PostList";

export default function SearchPage() {
  return (
    <main className="flex flex-col gap-6">
      <div className="flex items-center justify-center ">
        <input
          type="text"
          className="text-4xl outline-none min-w-60 "
          placeholder="검색어 입력"
        />
        <XCircle className="w-10 h-10 cursor-pointer mr-4" />
        <Search className="w-10 h-10 cursor-pointer" />
      </div>
      <div className="flex gap-2">
        <p className="border-r border-r-gray-300 pr-2 cursor-pointer ">
          정확도순
        </p>
        <p className="cursor-pointer">최신순</p>
      </div>
      <PostList />
    </main>
  );
}
