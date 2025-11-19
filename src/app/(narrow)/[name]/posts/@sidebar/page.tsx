import { auth } from "@/src/auth";
import { getTagList } from "../_lib/getTagList";

export default async function Sidebar() {
  const session = await auth();

  const Tags = await getTagList(session?.user?.email);
  const tagList = new Map<string, number>();
  Tags.forEach((row) => {
    const tags = row.Tags ?? [];

    tags.forEach((tag: string) => {
      const prev = tagList.get(tag) ?? 0;
      tagList.set(tag, prev + 1);
    });
  });

  return (
    <div className="flex flex-col h-screen mt-96 ">
      <p className="text-lg font-semibold py-2 border-b-2 border-gray-200">
        태그 목록
      </p>
      <div className="flex flex-col gap-2">
        {Array.from(tagList.entries()).map(([tag, count]) => (
          <div key={tag} className="flex gap-2">
            <span>{tag}</span>
            <span>({count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
