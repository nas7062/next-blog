import { use } from "react";
import SearchInput from "./_components/SearchInput";
import SinglePostList from "../../_components/SinglePostList";

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q: raw } = use(searchParams);
  const q = Array.isArray(raw) ? raw[0] : (raw ?? "");

  return (
    <main className="flex flex-col justify-center mx-auto  gap-8">
      <SearchInput q={q} />
      <div className="flex justify-center">
        <h3 className="text-2xl text-gray-600">
          총 10000건의 포스트를 찾았습니다.
        </h3>
      </div>
      <div className="flex gap-2">
        <p className="border-r border-r-gray-300 pr-2 cursor-pointer ">
          정확도순
        </p>
        <p className="cursor-pointer">최신순</p>
      </div>
      <SinglePostList q={q} />
    </main>
  );
}
