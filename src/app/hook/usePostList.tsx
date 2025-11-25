"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostList, PAGE_SIZE } from "../_lib/getPostList";
import type { IPost } from "../(wide)/write/_components/WirtePageClient";

export function usePostList() {
  return useInfiniteQuery<IPost[], Error>({
    queryKey: ["posts"],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => getPostList(pageParam as number, PAGE_SIZE),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
  });
}
