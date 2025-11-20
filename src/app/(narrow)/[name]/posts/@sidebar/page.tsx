"use client";
import { getTagList } from "../_lib/getTagList";
import { useEffect, useState } from "react";
import { getUserById } from "@/src/app/_lib/getUserById";
import { IUser } from "@/src/app/_components/PostDetail";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const id = usePathname().split("/")[1];
  const [userData, setUserData] = useState<IUser>();
  const [tags, setTags] = useState<string[]>();
  const email = userData?.email as string;
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const selectTag = (tag: string) => {
    router.push(`${pathname}?tag=${tag}`);
  };
  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      const data = await getUserById(id);
      setUserData(data);
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (!email) return;
    const fetchTags = async () => {
      const Tags = await getTagList(email);
      setTags(Tags);
    };
    fetchTags();
  }, [email]);

  const tagList = new Map<string, number>();
  if (!tags) return;
  tags.forEach((row) => {
    const tagrow = row.Tags ?? [];
    tagrow.forEach((tag: string) => {
      const prev = tagList.get(tag) ?? 0;
      tagList.set(tag, prev + 1);
    });
  });

  return (
    <div className="flex flex-col  h-screen mt-96 ">
      <p className="text-lg font-semibold py-2 border-b-2 border-gray-200">
        태그 목록
      </p>
      <div className="flex flex-col gap-2">
        {Array.from(tagList.entries()).map(([tag, count]) => (
          <div key={tag} className="flex gap-2">
            <span
              onClick={() => selectTag(tag)}
              className="cursor-pointer hover:text-gray-500"
            >
              {tag}
            </span>
            <span>({count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
