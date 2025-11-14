"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IUser } from "../../_components/PostDetail";
import { getUserInfo } from "../../_lib/getUser";

export default function SettingPage() {
  const { data: user } = useSession();
  const [userData, setUserData] = useState<IUser>();
  const [name, setName] = useState(userData?.name);
  const [descript, setdescript] = useState("");
  const [mode, setMode] = useState<"Update" | "Default">("Default");
  const updateInfo = () => {};

  const changeMode = () => {
    if (mode === "Default") {
      setMode("Update");
    } else {
      setMode("Default");
    }
  };

  useEffect(() => {
    if (!user?.user.id) return;
    const fetchUser = async () => {
      const data = await getUserInfo(user?.user.id);
      setUserData(data);
    };
    fetchUser();
  }, [user?.user.id]);

  return (
    <div className="flex flex-col min-h-screen py-20 gap-10">
      <div className="flex gap-10">
        <div className="flex flex-col gap-4 justify-center items-center">
          <img
            src={userData?.image}
            alt="유저 이미지"
            width={100}
            height={100}
            className="rounded-full"
          />
          <button className="px-4 py-2 text-sm bg-green-400 text-white hover:bg-green-500 rounded-lg cursor-pointer">
            이미지 업로드
          </button>
          <button className="px-4 py-2 text-sm bg-red-400 text-white hover:bg-red-500 rounded-lg cursor-pointer">
            이미지 제거
          </button>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {mode === "Default" ? (
            <>
              <h2 className="text-4xl font-semibold">{userData?.name}</h2>
              <p className="text-gray-600">나만의 기록장</p>
            </>
          ) : (
            <>
              <input
                type="text"
                className="border border-gray-300 focus:border-gray-800 rounded-md h-10 px-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 focus:border-gray-800 rounded-md px-2 "
                value={descript}
                onChange={(e) => setdescript(e.target.value)}
              />
            </>
          )}

          <button
            className="text-green-500 cursor-pointer self-start"
            onClick={changeMode}
          >
            {mode === "Default" ? " 수정하기" : "저장하기"}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <h3 className="text-xl w-28 text-center">테마</h3>
        <button className="flex-1 bg-black text-white py-2 rounded-md cursor-pointer">
          다크
        </button>
        <button className="flex-1 bg-gray-100 text-black py-2 rounded-md cursor-pointer">
          화이트
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl w-28 text-center">회원 탈퇴</h3>
        <button className="px-4 py-2 text-sm bg-red-400 text-white hover:bg-red-500 rounded-lg cursor-pointer">
          회원탈퇴
        </button>
      </div>
      <p className="text-gray-400">
        탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
      </p>
    </div>
  );
}
