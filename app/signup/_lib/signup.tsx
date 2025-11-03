"use server";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL;
export async function onSubmit(formData: FormData) {
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const passwordConfirm = String(formData.get("passwordConfirm") || "");
  if (!email || !password) return;
  if (password !== passwordConfirm) return;

  const res = await fetch(`${baseUrl}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
    // Server Action에서는 캐시 방지 권장
    cache: "no-store",
  });
  console.log(res);

  if (res.ok) redirect("/login");
}
