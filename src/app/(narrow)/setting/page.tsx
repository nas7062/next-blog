"use client";
import { useSession } from "next-auth/react";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { IUser } from "../../_components/PostDetail";
import { getUserInfo } from "../../_lib/getUser";
import { useDropzone } from "react-dropzone";
import DEFAULT_IMAGE from "@/public/nextImage.png";
import { supabase } from "../../api/supabase";
import { useTheme } from "next-themes";
import { userDelete } from "./_lib/userDelete";
interface AboutThumbnailPreview {
  url: string;
  name: string;
  size: number;
}

export default function SettingPage() {
  const { data: user } = useSession();
  const [userData, setUserData] = useState<IUser>();
  const [name, setName] = useState(userData?.name);
  const [descript, setdescript] = useState(userData?.descript);
  const [mode, setMode] = useState<"Update" | "Default">("Default");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const { setTheme } = useTheme();
  const [thumbnailPreview, setThumbnailPreview] =
    useState<AboutThumbnailPreview>();
  //사진이 추가됐을 때 그 사진의 정보 상태담기
  const onDropThumbnail = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setThumbnailFile(file);
    //file 첫번째 파일을 저장
    const fileURL = URL.createObjectURL(file);
    //createObjectURL는 임시로 URL을 저장할수 있는 메서드
    setThumbnailPreview({ url: fileURL, name: file.name, size: file.size });
  }, []);

  //저장된 상태 삭제하기 ( 이미지 삭제 )
  const handleDeleteThumbnail = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 이벤트 버블링 막기
    setThumbnailPreview(undefined);
  };

  const { getRootProps, getInputProps } = useDropzone({
    //이미지가 들어가면 실행되는 함수
    onDrop: onDropThumbnail,
    //받는 이미지 확장자 리밋 설정
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  const updateInfo = async () => {
    if (!user?.user.id) return;

    let imageUrl = userData?.image; // 기존 이미지 URL

    // 1) 이미지 새로 업로드한 경우
    if (thumbnailFile) {
      const { data, error } = await supabase.storage
        .from("profile")
        .upload(`profile-${user.user.id}`, thumbnailFile, {
          upsert: true,
        });
      if (error) {
        console.log("이미지 업로드 실패:", error);
        return;
      }

      // 2) 업로드한 파일의 publicURL 만들기
      const { data: urlData } = supabase.storage
        .from("profile")
        .getPublicUrl(`profile-${user.user.id}`);

      imageUrl = urlData.publicUrl;
    }

    // 3) DB user table 업데이트
    const { error: updateError } = await supabase
      .from("users")
      .update({
        name: name,
        descript: descript,
        image: imageUrl,
      })
      .eq("id", user.user.id);

    if (updateError) {
      console.log("업데이트 실패:", updateError);
      return;
    }

    alert("저장 완료!");
  };

  const changeMode = () => {
    if (mode === "Default") {
      setMode("Update");
    } else {
      setMode("Default");
    }
  };
  const OnSave = () => {
    setName(name);
    setdescript(descript);
    changeMode();
  };

  const OnDelete = async () => {
    const response = await userDelete(user?.user?.id);
    console.log(response);
  };

  useEffect(() => {
    if (!user?.user.id) return;
    const fetchUser = async () => {
      const data = await getUserInfo(user?.user.id);
      setUserData(data);
    };
    fetchUser();
  }, [user?.user.id]);

  const imageSrc = thumbnailPreview?.url || userData?.image || DEFAULT_IMAGE;

  if (!userData) return;
  return (
    <div className="flex flex-col min-h-screen py-20 gap-10">
      <div className="flex gap-10">
        <div className="flex flex-col gap-4 justify-center items-center">
          <img
            src={imageSrc}
            className="rounded-full"
            alt="이미지를 업로드해주세요"
            width={100}
            height={100}
          />

          <div
            {...getRootProps()}
            className="px-4 py-2 text-sm bg-green-400 text-white hover:bg-green-500 rounded-lg cursor-pointer"
          >
            이미지 업로드 <input {...getInputProps()} />
          </div>
          <button
            onClick={handleDeleteThumbnail}
            className="px-4 py-2 text-sm bg-red-400 text-white hover:bg-red-500 rounded-lg cursor-pointer"
          >
            이미지 제거
          </button>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {mode === "Default" ? (
            <>
              <h3 className="text-4xl text-primary font-semibold">
                {name || userData.name}
              </h3>
              <p className="text-gray-500">{descript || userData.descript}</p>
            </>
          ) : (
            <>
              <input
                type="text"
                className="border border-gray-300 focus:border-gray-800 rounded-md h-10 px-2"
                defaultValue={userData?.name ? userData.name : name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 focus:border-gray-800 rounded-md px-2 "
                defaultValue={userData?.descript ? userData.descript : descript}
                value={descript}
                onChange={(e) => setdescript(e.target.value)}
              />
            </>
          )}

          <button
            className="text-green-500 cursor-pointer self-start"
            onClick={mode === "Default" ? changeMode : OnSave}
          >
            {mode === "Default" ? " 수정하기" : "수정완료"}
          </button>
        </div>
      </div>
      <button
        onClick={updateInfo}
        className="px-4 py-2 text-sm bg-green-400 text-white hover:bg-green-500 rounded-lg cursor-pointer ml-auto"
      >
        저장하기
      </button>
      <div className="flex justify-between items-center gap-2">
        <h3 className="text-xl! w-28 text-center">테마</h3>
        <button
          onClick={() => setTheme("dark")}
          className="flex-1 bg-black text-white py-2 rounded-md cursor-pointer"
        >
          다크
        </button>
        <button
          onClick={() => setTheme("light")}
          className="flex-1 bg-gray-100 text-black py-2 rounded-md cursor-pointer"
        >
          화이트
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-xl! w-28 text-center">회원 탈퇴</h3>
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
