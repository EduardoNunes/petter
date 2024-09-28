import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      message: string;
      petterImage: string;
      accessToken?: string;
      id?: number;
      name?: string;
      email?: string;
      profileImage?: string;
      petterInfo?: [];
      userInfo?: {};
    };
  }
}
