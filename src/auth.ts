import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { supabase } from "./app/api/supabase";


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

          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error || !data.user) return null;

          console.log(data.user.user_metadata.name)
          // NextAuth는 최소 id 필요
          return { id: data.user.id, email: data.user.email ?? undefined , name : data.user.user_metadata?.name ?? undefined};
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
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user = {
          id: token.sub,
          email: token.email,
          name : token.name
        };
      } else {
        session.user = null;
      }
    
      return session;
    }
  },
  
  
});
