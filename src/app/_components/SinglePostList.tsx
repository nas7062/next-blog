import { getSearchPost } from "../_lib/getSearchPost";
import { IPost } from "./PostList";
import SinglePost from "./SinglePost";

export default async function SinglePostList(q: { q?: string }) {
  const posts: IPost[] = await getSearchPost(q);
  console.log(posts);
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
}
