import { Metadata } from "next";

export const metadata: Metadata = {
  title: "차트 페이지 | 10012",
  description:
    "10012 정보 공유 플랫폼에서 현재 인기있는 프레임워크의 인기도를 확인해봐요",
  robots: {
    index: true,
    follow: true,
  },
};
export default function ChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
