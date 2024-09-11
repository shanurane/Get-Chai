import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import EmailProvider from "next-auth/providers/email";
import mongoose from "mongoose";
import User from "@/models/User";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        await connectDb();
        let currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          // create a new user
          currentUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
          user.name = currentUser.username;
        }
        return true;
      }
    },
    async session({ session, user, token }) {
      await connectDb();
      const dbUser = await User.findOne({ email: session.user.email }).lean();
      session.user.name = dbUser.username;
      return session;
    },
  },
});
export { authOptions as GET, authOptions as POST };
