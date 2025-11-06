"use client";
import TuiEditor from "./_components/TuiEditor";
import React, {
  FormEventHandler,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import TagList from "../../_components/TagList";
import Viewer from "./_components/View";
import { toast } from "sonner";
import { supabase } from "../../api/supabase";
import nextImage from "@/public/nextImage.png";

export interface IPost {
  coverImgUrl: string;
  createdAt: string;
  description: string;
  id: number;
  searchIndex?: string | null;
  title: string;
  updatedAt: string;
  userId: number;
}

export default function WritePage() {
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [getContent, setGetContent] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    console.log(title, getContent, tags);
    if (!title || !getContent) {
      toast.error("글 작성이 실패했습니다");
      return;
    } else {
      const { data, error } = await supabase
        .from("Post")
        .insert([
          {
            title,
            description: getContent,
            createdAt: "2025-01-25",
            updatedAt: "2025-01-25",
            userId: 1,
            coverImgUrl: "sadsad.png",
          },
        ])
        .select();
      if (error) {
        console.error("❌ Supabase insert error:", error);
      } else {
        console.log("✅ Insert success:", data);
      }
    }
  };

  const handleTagsPlus = () => {
    setTags((prev) => [...prev, tag]);
    setTag("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTagsPlus();
    }
  };
  const changeContent = (value: string) => {
    setGetContent(value);
  };

  return (
    <main className="h-screen w-full flex gap-9">
      <form onSubmit={onSubmit} className="text-center flex flex-1 flex-col">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="h-20 text-4xl outline-none font-semibold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="태그를 입력하세요"
          className="h-14 text-xl outline-none font-semibold"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <TagList tags={tags} />
        <div className="bg-white h-[500px]  mt-9 text-left">
          <TuiEditor content={getContent} contentChange={changeContent} />
        </div>

        <button
          type="submit"
          className="text-base bg-black text-white py-2 px-5 rounded-full mt-9"
        >
          서버에 전달
        </button>
      </form>
      <div className="w-1/2">
        <div className="bg-white h-screen flex-1 mt-9 text-left border border-[#ddd]">
          <Viewer content={getContent} />
        </div>
      </div>
    </main>
  );
}
