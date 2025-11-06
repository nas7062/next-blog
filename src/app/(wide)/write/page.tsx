"use client";
import TuiEditor from "./_components/TuiEditor";
import { FormEventHandler, KeyboardEvent, useState } from "react";
import TagList from "../../_components/TagList";
import Viewer from "./_components/View";

export default function WritePage() {
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [getContent, setGetContent] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
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

  return (
    <main className="h-screen w-full flex gap-9">
      <form onSubmit={onSubmit} className="text-center flex flex-col">
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
          <TuiEditor />
        </div>

        <button
          type="submit"
          className="text-base bg-black text-white py-2 px-5 rounded-full mt-9"
        >
          서버에 전달
        </button>
      </form>
      <div className="flex-1">
        <div className="bg-white h-screen flex-1 mt-9 text-left border border-[#ddd]">
          <Viewer content={getContent} />
        </div>
      </div>
    </main>
  );
}
