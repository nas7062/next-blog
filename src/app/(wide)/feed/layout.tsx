import { Metadata } from "next";

export const metadata: Metadata = {
  title: "피드 페이지 | 10012",
  description:
    "10012 정보 공유 플랫폼에서 나만의 블로그와 피드를 확인해 보세요.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
