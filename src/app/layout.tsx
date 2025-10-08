import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Drone Media Services - Professional Aerial Photography & Videography',
  description: 'Professional drone services for real estate, construction, events, and more. High-quality aerial photography and videography delivered through our secure client portal.',
  keywords: 'drone photography, aerial videography, real estate photography, construction documentation, event coverage',
  authors: [{ name: 'Drone Media Services' }],
  openGraph: {
    title: 'Drone Media Services - Professional Aerial Photography & Videography',
    description: 'Professional drone services for real estate, construction, events, and more.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

