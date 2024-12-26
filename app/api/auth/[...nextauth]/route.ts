import NextAuth from "next-auth";
import type { AuthOptions, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_SECRET as string,
            authorization: {
                params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
      },

      secret: process.env.NEXT_PUBLIC_AUTH_SECRET as string,
      callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.provider = account.provider;
                token.accessToken = account.access_token;
              }
              return token;
        },
        async session({ session, token }) {
            if (token.provider) {
                session.user.provider = token.provider as string; 
              }
              if (token.accessToken) {
                session.user.accessToken = token.accessToken as string;
              }
              return session;
            },
          }
} as AuthOptions
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
