"use client";
import TuiEditor from "./_components/TuiEditor";
import React, {
  FormEventHandler,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import TagList from "../../_components/TagList";
import Viewer from "./_components/View";
import { toast } from "sonner";
import { supabase } from "../../api/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { AboutThumbnailPreview } from "../../(narrow)/setting/page";
import { useDropzone } from "react-dropzone";

export interface IPost {
  coverImgUrl: string;
  createdAt: string;
  description: string;
  id: number;
  searchIndex?: string | null;
  title: string;
  updatedAt: string;
  userId: string;
  Tags?: string[];
  likeCount?: number;
  email: string;
}

export default function WritePage() {
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const searchParmas = useSearchParams();
  const postId = searchParmas.get("id");
  const router = useRouter();
  const { data: user } = useSession();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [getContent, setGetContent] = useState("");
  const [post, SetPost] = useState<IPost>();
  useEffect(() => {
    if (!postId) return;
    const OnUpdate = async () => {
      const { data } = await supabase
        .from("Post")
        .select("*")
        .eq("id", Number(postId));
      SetPost(data?.[0]);
    };
    OnUpdate();
  }, [postId]);

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

  const { getRootProps, getInputProps } = useDropzone({
    //이미지가 들어가면 실행되는 함수
    onDrop: onDropThumbnail,
    //받는 이미지 확장자 리밋 설정
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });
  const email = user?.user?.email as string;
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const uid = user?.user?.id;

    let imageUrl = post?.coverImgUrl;

    // 1) 이미지 새로 업로드한 경우
    if (thumbnailFile) {
      const { data, error } = await supabase.storage
        .from("Post")
        .upload(`Post-${post.id}`, thumbnailFile, {
          upsert: true,
        });
      if (error) {
        console.log("이미지 업로드 실패:", error);
        return;
      }

      // 2) 업로드한 파일의 publicURL 만들기
      const { data: urlData } = supabase.storage
        .from("Post")
        .getPublicUrl(`Post-${post?.id}`);

      imageUrl = urlData.publicUrl;
    }

    // 3) DB user table 업데이트
    const { error: updateError } = await supabase
      .from("Post")
      .update({
        coverImgUrl: imageUrl,
      })
      .eq("email", email);

    if (updateError) {
      console.log("업데이트 실패:", updateError);
      return;
    }

    if (!uid) return;
    if (!title || !getContent) {
      toast.error("제목 또는 내용을 입력 해주세요.");
      return;
    } else {
      const { data, error } = await supabase
        .from("Post")
        .insert([
          {
            title,
            description: getContent,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: uid,
            email: user.user?.email,
            coverImgUrl: imageUrl || "/noImage.jpg",
            Tags: tags,
          },
        ])
        .select();

      if (error) {
        toast.error("글 작성에 실패했습니다.");
        console.error(" Supabase insert error:", error);
      } else {
        router.push(`/${user.user?.name}/${data[0].id}`);
      }
    }
  };

  const handleTagsPlus = () => {
    setTags((prev) => [...prev, tag]);
    setTag("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTagsPlus();
      e.preventDefault();
    }
  };
  const changeContent = (value: string) => {
    setGetContent(value);
  };

  return (
    <main className="h-screen w-full flex gap-9 text-primary">
      <form onSubmit={onSubmit} className="text-center flex flex-1 flex-col">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="h-20 text-4xl outline-none font-semibold"
          value={post ? post.title : title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="태그를 입력하세요"
          className="h-14 text-xl outline-none font-semibold"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <TagList tags={post?.Tags ? post?.Tags : tags} />
        <div className="bg-white h-[500px]  mt-9 text-left">
          <TuiEditor
            content={post ? post.description : getContent}
            contentChange={changeContent}
          />
        </div>

        <button
          type="submit"
          className="text-base py-2 px-5 bg-green-500 text-white hover:bg-green-400 cursor-pointer transition-colors duration-300 rounded-full mt-9"
        >
          글 작성하기
        </button>
      </form>
      <div className="w-1/2 flex flex-col">
        <div className="flex items-center ">
          <img
            src={thumbnailPreview?.url || "/noImage.jpg"}
            alt="이미지를 업로드해주세요"
            width={100}
            height={100}
          />
          <div
            {...getRootProps()}
            className="ml-auto w-32 h-10 px-4 py-2 text-sm bg-green-400 text-white hover:bg-green-500 rounded-lg cursor-pointer"
          >
            썸네일 업로드 <input {...getInputProps()} />
          </div>
        </div>

        <div className=" h-screen flex-1 mt-9 text-left border border-[#ddd]">
          <Viewer content={getContent} />
        </div>
      </div>
    </main>
  );
}
