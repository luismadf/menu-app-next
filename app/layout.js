import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './ui'
import { auth } from '@/auth'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout({ children }) {
  const session = await auth()

  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Navbar session={session} />
          <main className="container">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
