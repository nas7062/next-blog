// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",  
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(creds) {
        try {
          const email = creds?.email as string;
          const password = creds?.password as string;
          if (!email || !password) return null;

          const { data, error } = await sb.auth.signInWithPassword({
            email,
            password,
          });

          if (error || !data.user) return null;

          console.log(data);
          // NextAuth는 최소 id 필요
          return { id: data.user.id, email: data.user.email ?? undefined };
        } catch (e) {
          console.error("authorize error:", e);
          return null; // 실패는 null로
        }
      },
    }),
  ],
  callbacks: {
    // v5: JWT 전략이면 이후 호출에 user가 undefined일 수 있음 → token 사용
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // token.sub, token.email 사용
      if (token?.sub) {
        // 필요 시 Supabase용 액세스 토큰 발급
        const signingSecret = process.env.SUPABASE_JWT_SECRET;
        if (signingSecret && session.expires) {
          const payload = {
            aud: "authenticated",
            exp: Math.floor(new Date(session.expires).getTime() / 1000),
            sub: token.sub,
            email: token.email,
            role: "authenticated",
          };
          // @ts-expect-error: 커스텀 필드
          session.supabaseAccessToken = jwt.sign(payload, signingSecret);
        }
      }
      return session;
    },
  },
  
  
});
