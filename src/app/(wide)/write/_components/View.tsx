"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Viewer({ content }: { content: string }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content, // DB에서 가져온 HTML 그대로 전달
    editable: false, // 수정 불가능 (뷰어 모드)
  });

  return <EditorContent editor={editor} />;
}
