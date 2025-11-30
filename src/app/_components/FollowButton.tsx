import { useState, useEffect } from "react";
import { deleteFollow } from "../_lib/deleteFollow";
import { createFollow } from "../_lib/createFollow";
import { checkFollow } from "../_lib/checkFollow";
import clsx from "clsx";

export function FollowButton({
  userId,
  targetId,
}: {
  userId?: string | null;
  targetId: string;
}) {
  const [isFollowing, setIsFollowing] = useState(false); // 팔로우 상태
  const [loading, setLoading] = useState(false); // 서버 요청 상태

  useEffect(() => {
    // 페이지 로드 시 현재 팔로우 상태를 확인
    if (!userId) return;
    const checkFollowStatus = async () => {
      const response = await checkFollow(userId, targetId);
      setIsFollowing(response as boolean);
    };

    checkFollowStatus();
  }, [userId, targetId]);
  console.log(isFollowing);
  const handleFollowToggle = async () => {
    setLoading(true);
    if (!userId) return;
    try {
      let result;
      if (isFollowing) {
        // 이미 팔로우 중이면 언팔로우
        result = await deleteFollow(userId, targetId);
      } else {
        // 팔로우하지 않으면 팔로우
        result = await createFollow(userId, targetId);
      }

      if (!result) {
        setIsFollowing((prevState) => !prevState);
      }
    } catch (error) {
      console.error("팔로우 상태 변경 오류", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollowToggle}
      disabled={loading}
      className={clsx(
        "px-2   py-1 border border-green-400 text-sm text-green-400 rounded-xl cursor-pointer  transition-colors ",
        isFollowing
          ? "bg-green-500 text-white hover:bg-white hover:text-green-400"
          : "hover:bg-green-500 hover:text-white"
      )}
    >
      {loading ? "로딩 중..." : isFollowing ? "언팔로우" : "팔로우"}
    </button>
  );
}
