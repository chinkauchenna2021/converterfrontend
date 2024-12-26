// types/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      name: string | null;
      email: string | null;
      image: string | null;
      provider: string | null;
      accessToken : string | null;
    };
  }

  interface JWT {
    provider?: string | null;
  }
}
