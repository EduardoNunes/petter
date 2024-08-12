import errorResponse from "@/components/Error/ErrorResponse";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { getServerSession } from "next-auth";

interface User {
  id: string;
  accessToken: string;
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const user = await response.json();

          if (user && response.ok) {
            return user;
          } else {
            throw new Error(user.message || 'Erro ao fazer login');
          }
        } catch (error: any) {
          errorResponse(error);
          console.error("Deu ruim aqui:", error.message);
          throw new Error(error.message || 'Erro ao fazer login');
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        try {
          const response = await fetch(
            `http://localhost:3001/auth/user/${(token.user as User).id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const updatedUser = await response.json();

          session.user = {
            ...updatedUser,
            accessToken: (token.user as User).accessToken,
          };
          
        } catch (error) {
          console.error("Error fetching updated user data:", error);
          session.user = token.user as any;
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
  },
};

export const getServerAuthSession = () => getServerSession(nextAuthOptions);