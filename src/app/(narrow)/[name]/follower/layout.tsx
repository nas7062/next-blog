import { getUserById } from "@/src/app/_lib/getUserById";
import { Metadata } from "next";

type RouteParams = {
  name: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { name } = await params;

  const user = await getUserById(name);
  const userName = user?.name ?? "사용자";

  return {
    title: `${userName}님의 팔로워 | 10012`,
    description: `${userName}님의 10012 팔로워 리스트 입니다.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function FollowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen  lg:max-w-[60%] mx-auto px-6 py-12">
      {children}
    </main>
  );
}
