"use client";

import { IRepple, IUser } from "@/src/app/_components/PostDetail";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useEffect, useRef, useState } from "react";
import { updateComment } from "../_lib/updateComment";
import { toast } from "sonner";
import { getUserInfo } from "@/src/app/_lib/getUser";
import { getUserById } from "@/src/app/_lib/getUserById";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function Repple({
  user,
  repple,
  onDelete,
}: {
  user: IUser | null;
  repple: IRepple;
  onDelete: (id: number) => void;
}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [reppleUser, setReppleUser] = useState<IUser | null>(null);
  const handleResizeHeight = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const changeUpdate = () => {
    setIsUpdate((prev) => !prev);
  };

  const onUpdate = async () => {
    if (!repple.id || !textareaRef.current?.value || !user?.id) return;
    try {
      const response = await updateComment(
        repple.id,
        textareaRef.current?.value,
        user.id
      );
      if (response) {
        toast.success("댓글 수정 완료.");
        changeUpdate();
      }
    } catch (error) {
      console.error(error);
      toast.error("댓글 수정 실패");
    }
  };

  useEffect(() => {
    const id = repple.userid;
    if (!id) return;
    const getUserData = async () => {
      const data = await getUserById(id);
      setReppleUser(data);
    };
    getUserData();
  }, [repple.userid]);
  const isMyRepple = repple.userid === user?.id;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <img
          src={reppleUser?.image ? reppleUser?.image : "/noImage.jpg"}
          alt="댓글 이미지"
          className="w-14 h-14 rounded-full"
        />
        <div className="flex flex-col gap-2">
          <p>{reppleUser?.name}</p>
          <p>{dayjs(repple?.updatedat).format("YYYY년 MM월 DD일")}</p>
        </div>
        <div className="flex gap-2 ml-auto">
          {isMyRepple && (
            <>
              {!isUpdate ? (
                <button
                  className="hover:text-gray-400 cursor-pointer"
                  onClick={changeUpdate}
                >
                  수정
                </button>
              ) : (
                <button
                  className="hover:text-gray-400 cursor-pointer"
                  onClick={onUpdate}
                >
                  수정완료
                </button>
              )}

              <button
                className="hover:text-red-400 cursor-pointer"
                onClick={() => onDelete(repple.id)}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
      {isUpdate ? (
        <textarea
          ref={textareaRef}
          onInput={handleResizeHeight}
          rows={1}
          defaultValue={repple.content ? repple.content : ""}
          className="resize-none w-full min-h-16 h-auto bg-slate-200 rounded-lg text-black p-2"
        />
      ) : (
        <div>{repple?.content}</div>
      )}
    </div>
  );
}
