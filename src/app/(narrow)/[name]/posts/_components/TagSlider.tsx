"use client";

import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { IUser } from "@/src/app/_components/PostDetail";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TagRow } from "../@sidebar/page";
import { getUserById } from "@/src/app/_lib/getUserById";
import { getTagList } from "../_lib/getTagList";

export function TagSlider() {
  const id = usePathname().split("/")[1];
  const [userData, setUserData] = useState<IUser | null>(null);
  const [tags, setTags] = useState<TagRow[] | null>(null);
  const email = userData?.email as string;
  const router = useRouter();
  const pathname = usePathname();

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
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-4xl"
    >
      <CarouselContent className="flex">
        {Array.from(tagList.entries()).map(([tag, count]) => (
          <CarouselItem key={tag} className="basis-1/5 block lg:hidden">
            <div className="py-1 w-auto ">
              <div className="border rounded-xl bg-green-400 text-white hover:bg-green-500">
                <CardContent className=" w-auto flex text-xs  items-center justify-center py-1">
                  <span className="font-semibold">{tag}</span>
                  <span>({count})</span>
                </CardContent>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
