"use client";

import Modal from "@/src/app/_components/Modal";
import { getSupabaseClient } from "@/src/app/api/supabase";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
export default function DeletePostModal() {
  const pathname = usePathname();
  const router = useRouter();
  const postId = pathname.split("/")[2];
  const supabase = getSupabaseClient();
  const onDelete = async () => {
    const respose = await supabase
      .from("Post")
      .delete()
      .eq("id", Number(postId));
    if (respose.status === 204) {
      toast.success("데이터가 삭제되었습니다");
      router.back();
    } else {
      toast.error("데이터 삭제가 실패했습니다.");
    }
  };
  return (
    <Modal>
      <div className="flex flex-col  gap-4 p-4 ">
        <h2 className="text-2xl! font-semibold text-center">
          정말로 삭제하시겠어요??
        </h2>
        <p className="text-gray-500 text-center">삭제 시 되돌릴 수 없습니다.</p>
        <div className="flex justify-around gap-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white flex-1 cursor-pointer hover:bg-gray-400  transition-colors duration-300"
          >
            취소
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-400 text-white flex-1 cursor-pointer hover:bg-red-500 transition-colors duration-300"
          >
            삭제
          </button>
        </div>
      </div>
    </Modal>
  );
}
