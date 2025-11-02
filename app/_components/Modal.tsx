"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById("modal-root"));
  }, []);

  // 열고 스크롤 잠금
  useEffect(() => {
    if (!container) return;
    const el = dialogRef.current;
    if (!el) return;

    // showModal은 열린 상태에서 다시 호출하면 DOMException
    if (!el.open) {
      try {
        el.showModal();
      } catch {
        el.setAttribute("open", "");
      }
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      if (el.open) el.close();
      document.body.style.overflow = overflow;
    };
  }, [container]);

  const safeClose = () => {
    // 히스토리가 없으면 백 대신 세이프 라우트로 이동
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/"); // 필요 시 원하는 경로로 변경
    }
  };

  const onBackdropClick: React.MouseEventHandler<HTMLDialogElement> = (e) => {
    if (e.target === e.currentTarget) {
      safeClose();
    }
  };

  const onCancel: React.FormEventHandler<HTMLDialogElement> = (e) => {
    e.preventDefault(); // 기본 close 막기
    safeClose();
  };

  if (!container) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="max-w-[32rem] w-[90vw] max-h-[60vh]  rounded-lg p-4 absolute left-1/2 top-1/2 -translate-1/2  overflow-x-hidden"
      aria-labelledby="modal-title"
      onClick={onBackdropClick}
      onCancel={onCancel}
      onClose={safeClose}
    >
      {children}
    </dialog>,
    container
  );
}
