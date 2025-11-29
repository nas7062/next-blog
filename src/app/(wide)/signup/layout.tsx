import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입 페이지 | 10012",
  description:
    "10012 정보 공유 플랫폼에 회원가입하고 나만의 블로그와 피드를 만들어 보세요.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
