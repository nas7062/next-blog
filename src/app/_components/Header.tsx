import Link from "next/link";
import SearchInput from "./SearchInput";
import { auth } from "@/src/auth";

const NAV = {
  "": { label: "홈" },
  feed: { label: "피드" },
  latest: { label: "최신" },
  chart: { label: "차트" },
} as const;

export default async function Header() {
  const session = await auth();

  console.log(session?.user);

  return (
    <header className="h-20 flex items-center px-48 gap-10 ">
      <Link className="text-4xl font-semibold cursor-pointer" href="/">
        10012
      </Link>
      <nav>
        <ul className="flex text-xl gap-8">
          {Object.entries(NAV).map(([key, v]) => (
            <li
              key={key}
              className="relative pb-1  cursor-pointer
                         after:content-[''] after:absolute after:left-0 after:bottom-0
                         after:h-0.5 after:w-0 after:bg-current
                         after:transition-all after:duration-300 hover:after:w-full"
            >
              <Link href={"/" + key}>{v.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <SearchInput />
      <div className="ml-auto flex items-center gap-10">
        <Link
          href={"/write"}
          className="px-4 py-2 rounded-2xl bg-green-400 text-white cursor-pointer hover:bg-green-500 transition-all duration-200"
        >
          새 글 작성
        </Link>
        {!session?.user ? (
          <Link
            href={"/signin"}
            className="px-4 py-2 rounded-2xl bg-gray-700 hover:bg-gray-900 text-white  cursor-pointer transition-all duration-200"
          >
            로그인
          </Link>
        ) : (
          <button className="px-4 py-2 rounded-2xl bg-gray-700 hover:bg-gray-900 text-white  cursor-pointer transition-all duration-200">
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
}
