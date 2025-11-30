import { FollowButton } from "@/src/app/_components/FollowButton";
import { ChevronRight } from "lucide-react";

export default function FollowingPage() {
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
