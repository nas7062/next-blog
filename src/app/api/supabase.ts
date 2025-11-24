import { createClient } from "@supabase/supabase-js";
import { Database } from "../type/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
if (!supabaseUrl) {
  throw new Error("supabaseUrl is required.");
}
if (!supabaseAnonKey) {
  throw new Error("supabaseAnonKey is required.");
}
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey); // 클라이언트 생성
