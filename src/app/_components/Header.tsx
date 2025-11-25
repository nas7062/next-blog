import Link from "next/link";
import SearchInput from "./SearchInput";
import { auth } from "@/src/auth";
import LogoutButton from "./LogoutButton";
import { MyCombo } from "./MyCombo";
import HeaderNav from "./HeaderNav";

export default async function Header() {
  const session = await auth();

  return (
    <header className="h-20 relative flex items-center px-4 md:px-10 gap-4 md:gap-10 ">
      <Link
        className="text-2xl md:text-4xl font-semibold cursor-pointer"
        href="/"
      >
        <img src="/logo.png" alt="로고" className="w-20 h-20" />
      </Link>
      <HeaderNav />
      <div className="flex-1">
        <SearchInput />
      </div>
      <div className="ml-auto flex items-center gap-10 ">
        {!session?.user ? (
          <Link
            href={"/signin"}
            className="px-4 py-2  rounded-2xl bg-gray-700 hover:bg-gray-900 text-white  cursor-pointer transition-all duration-200"
          >
            로그인
          </Link>
        ) : (
          <>
            <Link
              href={"/write"}
              className="md:block hidden px-4 py-2 rounded-2xl bg-green-400 text-white cursor-pointer hover:bg-green-500 transition-all duration-200"
            >
              글 작성
            </Link>
            <LogoutButton />
            <MyCombo user={session.user} />
          </>
        )}
      </div>
    </header>
  );
}
