import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (credentials.password === process.env.ADMIN_PASSWORD) {
          return { name: 'administrator' }
        }
        return null
      },
    }),
  ],
})
