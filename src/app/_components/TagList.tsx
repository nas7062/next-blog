export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2">
      {tags.map((tag, idx) => (
        <div
          className="px-4 py-2 text-white bg-green-400 rounded-2xl"
          key={idx}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
