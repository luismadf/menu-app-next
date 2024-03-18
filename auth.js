import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUser } from '@/lib/api/user/queries'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  pages: {
    signIn: '/auth/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const user = await getUser({
          email: credentials.email,
          password: credentials.password
        })

        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    //   async redirect({ url, baseUrl }) {
    //     // Allows relative callback URLs
    //     // console.log({ url: new URL(url), baseUrl })
    //     // if (url.startsWith('/')) return `${baseUrl}${url}`
    //     // // Allows callback URLs on the same origin
    //     // else if (new URL(url).origin === baseUrl) return url
    //     return baseUrl
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.user.id
        session.user.access_token = token.user.token
      }

      return session
    }
  }
})
