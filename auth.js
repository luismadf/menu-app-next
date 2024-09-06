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
    async redirect({ url, baseUrl }) {
      const splittedUrl = url.split('callbackUrl=')
      if (splittedUrl.length > 1) return decodeURIComponent(splittedUrl[1])
      return baseUrl
    },
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
    },
    authorized: async ({ auth }) => {
      return !!auth
    }
  }
})
