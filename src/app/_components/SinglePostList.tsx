import { IPost } from "./PostList";
import SinglePost from "./SinglePost";

export default async function SinglePostList({ posts }: { posts: IPost[] }) {
  if (!posts || posts.length === 0) {
    return <div className="text-slate-400 text-center">게시물이 없습니다.</div>;
  }
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
}
