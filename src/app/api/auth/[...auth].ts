import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // Passwordless / email sign in
    EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js <no-reply@example.com>'
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("here", credentials);
        // Add your authentication logic here
        // This is where you would typically:
        // 1. Check the credentials against your database
        // 2. Return user object if valid, null if invalid
        
        if (credentials?.email === "moiz@gmail.com" && credentials?.password === "moiz@gmail.com") {
          return {
            id: "1",
            email: credentials.email,
            name: "Example User"
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/login', // Custom sign-in page (you'll need to create this)
  },
  session: {
    strategy: "jwt"
  }
})