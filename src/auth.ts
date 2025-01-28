import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorization attempt:", credentials);

        if (
          credentials?.email === "moiz@gmail.com" &&
          credentials?.password === "moiz@gmail.com"
        ) {
          console.log("here");
          return {
            id: "1",
            email: credentials.email,
            name: "Example User",
          };
        }
        console.log("here2");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Update this to match your route structure
  },
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: 10, // 10 seconds
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add custom claims to the JWT token
      console.log("User in JWT callback:", user);
      if (user) {
        // token.role = user.role;
        // Add any other custom data you want to store
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom session data
      console.log("User in JWT callback:", token, session);
      if (session.user) {
        // session.user.role = token.role;
        // Add any other custom data you want to access in your app
      }
      return session;
    },
  },
});

// export { auth, handler as GET, handler as POST };
// Export the auth options and handler
// const handler = NextAuth(authOptions);
// export { authOptions as auth, handler as GET, handler as POST };
