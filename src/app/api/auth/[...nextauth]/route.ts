import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const response = await fetch(
          `${process.env.BASE_URL}/api/user/${credentials?.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-cache",
          }
        );

        const json = await response.json();

        const passWordIsCorrect = json.password === credentials?.password;

        if (passWordIsCorrect) {
          return { id: json.id, email: json.email };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, profile, account }) {
      // console.log({ token, user, session, profile, account });
      if (user) {
        return {
          ...token,
          id: user.id,
          provider: account?.provider,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          provider: token.provider,
        },
      };
      // return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
