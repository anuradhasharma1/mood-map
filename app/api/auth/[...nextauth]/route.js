import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    //  Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

     //  Email & Password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({
          email: credentials.email,
        });
 
        if (!user) throw new Error("No user found with this email");
 
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
 
        if (!isValid) throw new Error("Incorrect password");
 
        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
    session: {
    strategy: "jwt", // use JWT for credentials provider
  },
 
  pages: {
    signIn: "/login", // redirect to  custom login page
  },
 
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id;
      return session;
    },
  },
 
  secret: process.env.NEXTAUTH_SECRET,
});
 
export { handler as GET, handler as POST };
 