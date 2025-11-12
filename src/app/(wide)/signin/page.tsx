"use client";
import Link from "next/link";
import Modal from "@/src/app/_components/Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import kakaoImage from "@/public/kakao_btn.png";
import Image from "next/image";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    router.replace("/");
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.status !== 200) {
      setMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    router.replace("/");
  };
  return (
    <Modal>
      <div className="flex flex-col justify-center p-4 gap-4">
        <h2 className="text-3xl text-center">로그인</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2 ">
            <label
              htmlFor="email"
              className="text-lg bg-gray-200 px-4 py-2 rounded-md w-28 flex justify-center items-center"
            >
              이메일
            </label>
            <input
              type="text"
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
              className="border border-gray-300 rounded-md flex-1 px-2 outline-none focus:border-2 focus:border-gray-700 "
            />
          </div>
          <div className="flex gap-2 ">
            <label
              htmlFor="password"
              className="text-lg bg-gray-200 px-4 py-2 rounded-md  w-28 flex justify-center items-center "
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="border border-gray-300 rounded-md flex-1 px-2   outline-none focus:border-2 focus:border-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className=" bg-green-400 py-3 text-2xl hover:bg-emerald-400 text-white cursor-pointer transition-colors duration-300"
          >
            로그인
          </button>
          <button className="f-full" onClick={() => signIn("kakao")}>
            <Image
              src={kakaoImage}
              alt="카카오 로그인 버튼"
              className="w-full h-14"
            />
          </button>
        </form>
        {message && (
          <p className="text-sm text-red-600 pt-2" role="alert">
            {message}
          </p>
        )}
        <div className="flex justify-end gap-2 text-green-500">
          <p>아직 회원이 아니신가요?</p>
          <Link href={"/signup"}>
            <strong className="cursor-pointer"> 회원가입</strong>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
