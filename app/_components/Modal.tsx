"use client";

import { ReactNode, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openingAtRef = useRef<number>(0);
  const OPEN_GUARD_MS = 120; // 오픈 직후 보호 시간

  const container = useMemo(
    () =>
      typeof window !== "undefined"
        ? document.getElementById("modal-root")
        : null,
    []
  );

  // 열기 + 스크롤 잠금. 한 틱 지연하여 초기 클릭 전파를 회피
  useLayoutEffect(() => {
    if (!container) return;
    const el = dialogRef.current;
    if (!el) return;

    let raf = 0;
    raf = requestAnimationFrame(() => {
      if (!el.open) {
        try {
          el.showModal();
        } catch {
          el.setAttribute("open", "");
        }
      }
      openingAtRef.current = performance.now();
    });

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      if (el.open) el.close();
      document.body.style.overflow = overflow;
    };
  }, [container]);

  const safeClose = () => {
    // 오픈 직후 의도치 않은 close 방지
    if (performance.now() - openingAtRef.current < OPEN_GUARD_MS) return;

    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const onBackdropClick: React.MouseEventHandler<HTMLDialogElement> = (e) => {
    if (performance.now() - openingAtRef.current < OPEN_GUARD_MS) return;
    if (e.target === e.currentTarget) safeClose();
  };

  const onCancel: React.FormEventHandler<HTMLDialogElement> = (e) => {
    e.preventDefault();
    safeClose();
  };

  // 일부 브라우저에서 close 이벤트가 곧바로 오는 경우 가드
  const onClose: React.FormEventHandler<HTMLDialogElement> = () => {
    safeClose();
  };

  if (!container) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="max-w-[32rem] w-[90vw] max-h-[60vh] rounded-lg p-4 absolute left-1/2 top-1/2 -translate-1/2 overflow-x-hidden"
      aria-labelledby="modal-title"
      onClick={onBackdropClick}
      onCancel={onCancel}
      onClose={onClose}
    >
      {children}
    </dialog>,
    container
  );
}
