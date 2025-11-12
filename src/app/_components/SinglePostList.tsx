import { IPost } from "./PostList";
import SinglePost from "./SinglePost";

export default async function SinglePostList({ posts }: { posts: IPost[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
}
