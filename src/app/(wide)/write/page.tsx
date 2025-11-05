"use client";
import { Editor, Viewer } from "@toast-ui/react-editor";
import TuiEditor from "./_components/TuiEditor";
import { FormEventHandler, useEffect, useRef, useState } from "react";

export default function WritePage() {
  const editorRef = useRef<Editor>(null);
  const viewerRef = useRef<Viewer>(null);
  const [getContent, setGetContent] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const content = editorRef.current?.getInstance().getHTML();

    setGetContent(content);
  };

  useEffect(() => {
    viewerRef.current?.getInstance().setMarkdown(getContent);
  }, [getContent]);

  return (
    <main className="h-screen flex  gap-9 items-center justify-center">
      <form onSubmit={onSubmit} className="text-center">
        <h2 className="text-center text-2xl">Toast ui</h2>
        <div className="bg-white h-[500px] w-[750px] mt-9 text-left">
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
      <p>출력된 HTML</p>
      <div className="mt-28">
        <h2 className="text-center text-2xl">Toast ui - Viewer</h2>
        <div className="bg-white h-[500px] w-[750px] mt-9 text-left border border-[#ddd]">
          <Viewer height="100%" ref={viewerRef} initialValue={getContent} />
        </div>
      </div>
    </main>
  );
}
