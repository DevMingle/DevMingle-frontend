import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";
const handler = NextAuth({
  providers: [
    GithubProvider({
      clientSecret: process.env.GITHUB_SECRET || "your github oauth secret",
      clientId: process.env.GITHUB_ID || "your github id",
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      console.log(token, "token\n\n");
      try {
        const { data } = await axios.post(
          `${process.env.BACKEND_URL}/auth/oAuth`,
          {
            ...token
          }
        );
        if (data.success) {
          return { user: data.user, token: data.token };
        }
        return token;
      } catch (err) {
        //   console.log(err)
        return token;
      }
    },
  },
});

export { handler as GET, handler as POST };
