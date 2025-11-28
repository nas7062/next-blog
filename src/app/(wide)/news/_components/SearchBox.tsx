// app/it/itworld/SearchBox.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {
  defaultValue?: string;
};

export default function SearchBox({ defaultValue = "" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }

    const queryString = params.toString();
    router.push(`/news/${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex-1">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
        placeholder="원하는 키워드를 검색해주세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
