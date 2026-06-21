import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Umer Shahzaib - Full Stack Developer & AI Enthusiast',
  description: 'Portfolio of Umer Shahzaib - Full Stack Developer specializing in AI-powered web applications with Next.js, React, and Google Gemini AI. Explore projects, skills, and get in touch.',
  keywords: 'Umer Shahzaib, Full Stack Developer, AI Developer, Next.js, React, TypeScript, Google Gemini, Portfolio, Web Development',
  authors: [{ name: 'Umer Shahzaib' }],
  creator: 'Umer Shahzaib',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Umer Shahzaib - Full Stack Developer & AI Enthusiast',
    description: 'Portfolio showcasing AI-powered web applications and modern development skills',
    siteName: 'Umer Shahzaib Portfolio',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="ai-chat-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
