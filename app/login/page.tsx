"use client";
import Link from "next/link";
import Modal from "../_components/Modal";

export default function LoginPage() {
  return (
    <Modal>
      <div className="flex flex-col justify-center p-4 gap-4">
        <h2 className="text-3xl text-center">로그인</h2>
        <form action="/login" className="flex flex-col gap-4">
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
              placeholder="비밀번호를 입력하세요"
              className="border border-gray-300 rounded-md flex-1 px-2   outline-none focus:border-2 focus:border-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className=" bg-green-400 py-2 text-xl hover:bg-emerald-400 text-white cursor-pointer transition-colors duration-300"
          >
            로그인
          </button>
        </form>
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
