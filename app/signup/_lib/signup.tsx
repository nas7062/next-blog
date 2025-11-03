"use server";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL;
export async function onSubmit(formData: FormData) {
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const passwordConfirm = String(formData.get("passwordConfirm") || "");
  if (!email || !password || !name) return;
  if (password !== passwordConfirm) return;

  const res = await fetch(`${baseUrl}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
    cache: "no-store",
  });
  console.log(res);

  if (!res.ok) {
    const body = await res.text();
    console.error("signup 400:", res.status, body);
    return;
  }
  if (res.ok) redirect("/signin");
}
