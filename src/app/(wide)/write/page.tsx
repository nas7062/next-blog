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

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export interface IPost {
  coverImgUrl: string;
  createdAt: string;
  description: string;
  id: number;
  searchIndex?: string | null;
  title: string;
  updatedAt: string;
  userId: string;
  Tags?: string[];
  likeCount?: number;
}

export default function WritePage() {
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const searchParmas = useSearchParams();
  const postId = searchParmas.get("id");
  const router = useRouter();
  const { data: user } = useSession();

  const [getContent, setGetContent] = useState("");
  const [post, SetPost] = useState<IPost>();
  useEffect(() => {
    if (!postId) return;
    const OnUpdate = async () => {
      const { data } = await supabase
        .from("Post")
        .select("*")
        .eq("id", Number(postId));
      SetPost(data?.[0]);
    };
    OnUpdate();
  }, [postId]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const uid = user?.user?.id;
    console.log(uid);
    if (!uid) return;
    if (!title || !getContent) {
      toast.error("제목 또는 내용을 입력 해주세요.");
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
            userId: uid,
            coverImgUrl:
              "https://shopping-phinf.pstatic.net/main_3776194/37761944621.20230614072126.jpg",
            Tags: tags,
          },
        ])
        .select();
      console.log(data);
      if (error) {
        toast.error("글 작성에 실패했습니다.");
        console.error(" Supabase insert error:", error);
      } else {
        router.push(`/${user.user?.name}/${data[0].id}`);
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
      e.preventDefault();
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
          value={post ? post.title : title}
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
        <TagList tags={post?.Tags ? post?.Tags : tags} />
        <div className="bg-white h-[500px]  mt-9 text-left">
          <TuiEditor
            content={post ? post.description : getContent}
            contentChange={changeContent}
          />
        </div>

        <button
          type="submit"
          className="text-base bg-black text-white py-2 px-5 rounded-full mt-9"
        >
          글 작성하기
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
