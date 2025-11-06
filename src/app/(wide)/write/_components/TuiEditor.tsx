"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>안녕하세요 👋</p>", // 초기값 (HTML 가능)
  });

  return (
    <div className="border rounded-xl p-3">
      <EditorContent editor={editor} />
      <button
        onClick={() => console.log(editor?.getHTML())}
        className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-md"
      >
        HTML 보기
      </button>
    </div>
  );
}
