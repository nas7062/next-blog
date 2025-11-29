import { Metadata } from "next";

export const metadata: Metadata = {
  title: "세팅 페이지 | 10012",
  description: "10012 정보 공유 플랫폼에 로그인하고 내 정보를 변경 해봐요.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
