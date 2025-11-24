import { IPost } from "../(wide)/write/_components/WirtePageClient";
import { getPostList } from "../_lib/getPostList";
import Post from "./Post";

export default async function PostList() {
  let posts: IPost[] | null = null;

  try {
    posts = await getPostList();
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }

  if (!posts) {
    return <div>로딩 중... 또는 게시물을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
