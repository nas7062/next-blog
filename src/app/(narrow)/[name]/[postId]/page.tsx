import PostDetail from "@/src/app/_components/PostDetail";
import { getPostUser } from "@/src/app/_lib/getPostUser";
import { Metadata } from "next";
import { getPostById } from "./_lib/getPostById";

type RouteParams = {
  name: string;
  postId: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { name, postId } = await params;

  const numericPostId = Number(postId);

  let userName: string | undefined;

  if (!Number.isNaN(numericPostId)) {
    const result = await getPostById(numericPostId);
    userName = result?.title;
  }

  // DB에 이름이 없으면 URL 세그먼트의 name 사용
  const decodedName = decodeURIComponent(name);
  const finalName = userName ?? decodedName ?? "사용자";

  return {
    title: `${finalName} | 10012`,
    description: `${finalName}님의 10012 정보 페이지입니다.`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: Promise<{ name: string; postId: string }>;
}) {
  const { name, postId } = await params;

  const decodedName = decodeURIComponent(name);
  return <PostDetail name={decodedName} postId={postId} />;
}
