"use client";

import { FollowButton } from "@/src/app/_components/FollowButton";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function FollowerPage() {
  return (
    <div>
      <div>
        <Image />
        <div>username</div>
        <ChevronRight />
        <div>username</div>
      </div>
      <div>
        <div>
          <Image />
          <div>
            <div>username</div>
            <div>descript</div>
          </div>
          <FollowButton />
        </div>
      </div>
    </div>
  );
}
