"use client ";
import { useRef } from "react";

export default function ReppleForm() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div className="flex flex-col gap-4">
      <p>4개의 댓글</p>
      <textarea
        ref={textareaRef}
        onInput={handleResizeHeight}
        rows={1}
        className="resize-none w-full min-h-16 h-auto bg-slate-200 rounded-lg text-black p-2"
      />
      <button className="ml-auto  border border-green-400  rounded-xl px-4 py-1 cursor-pointer bg-green-500 text-white hover:bg-green-600 transition-colors duration-300">
        댓글 작성
      </button>
    </div>
  );
}
