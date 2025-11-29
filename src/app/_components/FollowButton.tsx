import { useState, useEffect } from "react";
import { deleteFollow } from "../_lib/deleteFollow";
import { createFollow } from "../_lib/createFollow";
import { checkFollow } from "../_lib/checkFollow";

export function FollowButton({
  userId,
  targetId,
}: {
  userId: string;
  targetId: string;
}) {
  const [isFollowing, setIsFollowing] = useState(false); // 팔로우 상태
  const [loading, setLoading] = useState(false); // 서버 요청 상태

  useEffect(() => {
    // 페이지 로드 시 현재 팔로우 상태를 확인
    const checkFollowStatus = async () => {
      const response = await checkFollow(userId, targetId);
      setIsFollowing(response as boolean);
    };

    checkFollowStatus();
  }, [userId, targetId]);
  console.log(isFollowing);
  const handleFollowToggle = async () => {
    setLoading(true);
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
    <button onClick={handleFollowToggle} disabled={loading}>
      {loading ? "로딩 중..." : isFollowing ? "언팔로우" : "팔로우"}
    </button>
  );
}
