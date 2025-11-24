"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById("modal-root"));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !container) return;
    const el = dialogRef.current;
    if (!el) return;

    try {
      el.showModal();
    } catch {
      el.setAttribute("open", "");
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      if (el.open) el.close();
      document.body.style.overflow = overflow;
    };
  }, [mounted, container]);

  const safeClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  if (!mounted || !container) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="max-w-[36rem] w-[90vw] max-h-[60vh]  rounded-lg p-4 absolute left-1/2 top-1/2 -translate-1/2 overflow-x-hidden"
      aria-labelledby="modal-title"
      onClick={(e) => e.target === e.currentTarget && safeClose()}
      onCancel={(e) => {
        e.preventDefault();
        safeClose();
      }}
      onClose={safeClose}
    >
      {children}
    </dialog>,
    container
  );
}
