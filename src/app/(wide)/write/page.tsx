import { Suspense } from "react";
import WritePageClient from "./_components/WirtePageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "글 작성 페이지 | 10012",
  description: "개발부터 일상까지, 나만의 글을 남기고 다른 사람들과 공유해요",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WritePage() {
  return (
    <Suspense fallback={<main>로딩 중...</main>}>
      <WritePageClient />
    </Suspense>
  );
}
