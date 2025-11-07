import { createClient } from "@supabase/supabase-js";
import { Database } from "@/src/app/type/superbase";
 
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey); // 클라이언트 생성
