import type { Metadata } from 'next'
import './globals.css'
import { Github } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Recipe Generator | Create Custom Meals from Your Ingredients',
  description: 'Generate personalized recipes based on your available ingredients, dietary preferences, and cooking equipment. Get instant meal ideas and step-by-step cooking instructions.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen bg-gradient-to-b from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-800`}>
        <Link
          href="https://github.com/phelma/ai-cook"
          className="fixed top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-stone-950/80 hover:bg-white dark:hover:bg-stone-950 transition-colors shadow-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-6 h-6" />
        </Link>
        {children}
      </body>
    </html>
  )
}
