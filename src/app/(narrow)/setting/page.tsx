import Image from "next/image";

export default function SettingPage() {
  return (
    <div>
      <div>
        <div>
          <Image src="" alt="" />
          <button>이미지 업로드</button>
          <button>이미지 제거</button>
        </div>
        <div>
          <h2>김민석</h2>
          <p>나만의 기록장</p>
          <button>수정</button>
        </div>
      </div>
      <div>
        <h3>테마</h3>
        <button>다크</button>
        <button>화이트</button>
      </div>
      <div>
        <h3>회원 탈퇴</h3>
        <button>회원탈퇴</button>
      </div>
      <p>탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</p>
    </div>
  );
}
