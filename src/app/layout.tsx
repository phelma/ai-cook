import type { Metadata } from 'next'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
