import Link from "next/link";
import { onSubmit } from "./_lib/signup";
import Modal from "../../_components/Modal";
import Image from "next/image";

export default function SignupPage() {
  return (
    <Modal>
      <div className="flex flex-col justify-center p-4 gap-4">
        <h2 className="text-3xl text-center">회원가입</h2>
        <form action={onSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2 ">
            <label
              htmlFor="name"
              className="text-sm bg-gray-400 px-2 py-2 rounded-md w-28 flex justify-center items-center"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="이름을 입력하세요"
              required
              className="border border-gray-300 rounded-md flex-1 px-2 outline-none focus:border-2 focus:border-gray-700 "
            />
          </div>
          <div className="flex gap-2 ">
            <label
              htmlFor="email"
              className="text-sm bg-gray-400 px-2 py-2 rounded-md w-28 flex justify-center items-center"
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
              className="text-sm bg-gray-400 px-2 py-2 rounded-md  w-28 flex justify-center items-center "
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
          <div className="flex gap-2 items-center ">
            <label
              htmlFor="passwordConfirm"
              className="text-sm bg-gray-400 px-2 py-2 rounded-md  w-28 flex justify-center items-center text-center "
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              autoComplete="passwordConfirm"
              placeholder="비밀번호를 입력하세요"
              className="border border-gray-300 rounded-md flex-1 px-2 py-2  outline-none focus:border-2 focus:border-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            className=" bg-green-400 py-2 text-xl hover:bg-emerald-400 text-white cursor-pointer transition-colors duration-300"
          >
            회원가입
          </button>
        </form>
        <div className="flex justify-end gap-2 text-green-500">
          <p>이미 회원이신가요?</p>
          <Link href={"/signin"}>
            <strong className="cursor-pointer hover:text-green-400">
              로그인
            </strong>
          </Link>
        </div>
        <div className="absolute top-0 right-0">
          <Image
            src="/hello.png"
            className="w-20 h-20"
            width={40}
            height={40}
            alt="곰 이미지"
          />
        </div>
      </div>
    </Modal>
  );
}
