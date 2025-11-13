import { IPost } from "../(wide)/write/page";
import { getPostList } from "../_lib/getPostList";
import Post from "./Post";

export default async function PostList() {
  const posts: IPost[] = await getPostList();
  return (
    <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-x-4 gap-y-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
