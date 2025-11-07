import { getPostList } from "../_lib/getPostList";
import { IPost } from "./PostList";
import SinglePost from "./SinglePost";

export default async function SinglePostList() {
  const posts: IPost[] = await getPostList();
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-8">
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
}
