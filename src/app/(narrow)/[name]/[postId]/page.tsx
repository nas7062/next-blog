import PostDetail from "@/src/app/_components/PostDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string; postId: string }>;
}) {
  const { name, postId } = await params;

  const decodedName = decodeURIComponent(name);
  return <PostDetail name={decodedName} postId={postId} />;
}
