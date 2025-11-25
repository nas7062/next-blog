"use client";

import { useEffect, useState } from "react";
import { getLikePosts } from "../../_lib/getLikePosts";
import { IPost } from "../write/_components/WirtePageClient";
import { useSession } from "next-auth/react";
import Post from "../../_components/Post";

export default function FeedPage() {
  const [posts, setPost] = useState<IPost[]>();
  const { data: session } = useSession();
  const email = session?.user?.email as string;
  useEffect(() => {
    if (!email) return;
    const fetchLike = async () => {
      const data = await getLikePosts(email);
      setPost(data);
    };
    fetchLike();
  }, [email]);

  if (!posts) return;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
