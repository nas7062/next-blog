"use client ";
import { useRef } from "react";
import { createComment } from "../_lib/createComment";
import { IUser } from "@/src/app/_components/PostDetail";
import { toast } from "sonner";

export default function ReppleForm({
  user,
  postId,
  reppleCount,
}: {
  user: IUser | null;
  postId: string;
  reppleCount?: number;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const onSubmit = async () => {
    if (!postId || !textareaRef.current || !user?.name || !user?.email) return;
    try {
      const response = await createComment({
        postId: Number(postId),
        content: textareaRef.current?.value,
        userid: user?.id,
        name: user?.name,
      });
      if (response) {
        toast.success("댓글이 등록되었습니다.");
        textareaRef.current.value = "";
      } else {
        toast.error("댓글 등록이 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p>{reppleCount}개의 댓글</p>
      <textarea
        ref={textareaRef}
        onInput={handleResizeHeight}
        rows={1}
        className="resize-none w-full min-h-16 h-auto bg-slate-200 rounded-lg text-black p-2"
      />
      <button
        onClick={onSubmit}
        className="ml-auto  border border-green-400  rounded-xl px-4 py-1 cursor-pointer bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
      >
        댓글 작성
      </button>
    </div>
  );
}
