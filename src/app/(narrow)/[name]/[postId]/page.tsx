import { use } from "react";
import SinglePostClient from "./PostDetail";

export default function Page({
  params,
}: {
  params: Promise<{ name: string; postId: string }>;
}) {
  const { name, postId } = use(params);

  return <SinglePostClient name={name} postId={postId} />;
}
