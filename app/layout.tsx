import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Tell me what to do",
  description: "I don't know what to do",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="h-full antialiased"
    >
      <body className="h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
