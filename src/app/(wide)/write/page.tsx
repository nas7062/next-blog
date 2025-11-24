import { Suspense } from "react";
import WritePageClient from "./_components/WirtePageClient";

export default function WritePage() {
  return (
    <Suspense fallback={<main>로딩 중...</main>}>
      <WritePageClient />
    </Suspense>
  );
}
