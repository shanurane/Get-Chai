import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import EmailProvider from "next-auth/providers/email";
import mongoose from "mongoose";
import User from "@/models/User";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import bcrypt from "bcryptjs"; // Make sure to import bcrypt for password hashing

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  // pages: {
  //   signIn: "/login",
  // },
  providers: [
    // credential configuration
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // username: { label: "Username", type: "text" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to the database
        await connectDb();

        // Find the user in the database
        const user = await User.findOne({ username: credentials.username });
        if (!user) {
          // User not found
          console.log("User not found");
          return NextResponse.json(
            { message: "Invalid Credentials" },
            { status: 500 }
          );
        }

        // Compare the provided password with the hashed password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          // If the password does not match, return null
          console.log("Invalid password");
          return NextResponse.json(
            { message: "Invalid Password" },
            { status: 500 }
          );
        }

        // If authentication is successful, return the user object
        return {
          id: user._id,
          name: user.username,
          email: user.email,
        };
      },
    }),
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
      return true;
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
