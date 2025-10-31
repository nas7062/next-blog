import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 flex items-center px-96 gap-10 ">
      <h1 className="text-4xl">10012</h1>
      <nav>
        <ul className="flex text-xl gap-8">
          <li>홈</li>
          <li>피드</li>
          <li>최신</li>
          <li>차트</li>
        </ul>
      </nav>
      <div className="flex relative">
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          className="w-92 h-10 rounded-2xl border border-gray-300 px-10 focus:border-gray-500 outline-none transition-all duration-500"
        />
        <Search className="absolute left-2 top-2" />
      </div>
      <div className="ml-auto flex items-center gap-10">
        <button className="px-4 py-2 rounded-2xl bg-green-400 text-white cursor-pointer hover:bg-green-500 transition-all duration-200">
          새 글 작성
        </button>
        <button className="px-4 py-2 rounded-2xl bg-gray-700 hover:bg-gray-900 text-white  cursor-pointer transition-all duration-200">
          {" "}
          로그인
        </button>
      </div>
    </header>
  );
}
