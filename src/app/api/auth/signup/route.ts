import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../supabase";



export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }, // user_metadata에 저장
    },
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({
    userId: data.user?.id,
    name: data.user?.user_metadata?.name ?? null,
  });
}
