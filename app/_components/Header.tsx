import { Search } from "lucide-react";
import Link from "next/link";

const NAV = {
  "": { label: "홈" },
  feed: { label: "피드" },
  latest: { label: "최신" },
  chart: { label: "차트" },
} as const;

export default function Header() {
  return (
    <header className="h-20 flex items-center px-64 gap-10 ">
      <Link className="text-4xl font-semibold cursor-pointer" href="/">
        10012
      </Link>
      <nav>
        <ul className="flex text-xl gap-8">
          {Object.entries(NAV).map(([key, v]) => (
            <li
              key={key}
              className="relative pb-1 cursor-pointer
                         after:content-[''] after:absolute after:left-0 after:bottom-0
                         after:h-[2px] after:w-0 after:bg-current
                         after:transition-all after:duration-300 hover:after:w-full"
            >
              <Link href={"/" + key}>{v.label}</Link>
            </li>
          ))}
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
          로그인
        </button>
      </div>
    </header>
  );
}
