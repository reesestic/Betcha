// =========================================================
// LOGIC: Authentication Configuration
// DESCRIPTION: Configures Auth.js to use GitHub OAuth. 
// Uses the MongoDB adapter to store user sessions in our database.
// =========================================================

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    // Expose the user's ID on the session object so we can
    // use it for ownership checks across the app
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});