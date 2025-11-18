import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { supabase } from "./app/api/supabase";
import Kakao from "next-auth/providers/kakao";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!, // 필수
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
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

          console.log(data.user.user_metadata.name);
          // NextAuth는 최소 id 필요
          return {
            id: data.user.id,
            email: data.user.email ?? undefined,
            name: data.user.user_metadata?.name ?? undefined,
          };
        } catch (e) {
          console.error("authorize error:", e);
          return null; // 실패는 null로
        }
      },
    }),
  ],
  callbacks: {
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
          name: token.name,
        };
      } else {
        session.user = null;
      }

      return session;
    },
    async signIn({ user }) {
      const { data, error } = await supabase
        .from("users") 
        .select("*")
        .eq("id", user.id)
        
      console.log(data,error)
      if (data) {
        await supabase.auth.signInWithOAuth({
          provider: "kakao",
        });
        await supabase.from("users").upsert([
          {
            id:user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            provider: "kakao",
          },
        ]);
      }

      return true;
    }
  },
});
