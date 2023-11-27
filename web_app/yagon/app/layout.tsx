import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yagon',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'font-sans bg-main'}>{children}</body>
    </html>
  )
}
