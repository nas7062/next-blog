import SearchInput from "./_components/SearchInput";
import SinglePostList from "../../_components/SinglePostList";

import { getSearchPost } from "../../_lib/getSearchPost";
import { IPost } from "../../_components/PostList";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q: raw } = await searchParams;
  const q = Array.isArray(raw) ? raw[0] : (raw ?? "");
  const posts: IPost[] = await getSearchPost({ q });

  return (
    <main className="flex flex-col justify-center mx-auto  gap-8">
      <SearchInput q={q} />
      <div className="flex justify-center">
        <h3 className="text-2xl text-gray-600">
          총 <strong className="text-gray-800 text-3xl">{posts.length}</strong>
          건의 포스트를 찾았습니다.
        </h3>
      </div>
      <div className="flex gap-2">
        <p className="border-r border-r-gray-300 pr-2 cursor-pointer ">
          정확도순
        </p>
        <p className="cursor-pointer">최신순</p>
      </div>
      <SinglePostList posts={posts} />
    </main>
  );
}
