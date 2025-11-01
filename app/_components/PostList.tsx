import Post from "./Post";

export default function PostList() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-8">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
        <Post key={idx} />
      ))}
    </div>
  );
}
