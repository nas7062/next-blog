"use client";
import { Editor, Viewer } from "@toast-ui/react-editor";
import TuiEditor from "./_components/TuiEditor";
import {
  FormEventHandler,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import TagList from "../../_components/TagList";

export default function WritePage() {
  const editorRef = useRef<Editor>(null);
  const viewerRef = useRef<Viewer>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [getContent, setGetContent] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const content = editorRef.current?.getInstance().getHTML();

    setGetContent(content);
  };

  useEffect(() => {
    viewerRef.current?.getInstance().setMarkdown(getContent);
  }, [getContent]);

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
          <TuiEditor
            ref={editorRef}
            height="100%"
            hideModeSwitch={true}
            initialEditType="wysiwyg"
            initialValue=" "
            toolbarItems={[
              ["heading", "bold"],
              ["ul", "ol"],
              ["code", "codeblock"],
            ]}
          />
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
          <Viewer height="100%" ref={viewerRef} initialValue={getContent} />
        </div>
      </div>
    </main>
  );
}
