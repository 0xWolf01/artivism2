import { Inter } from 'next/font/google'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import StructuredData from '@/components/StructuredData'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://artivism.com'),
  title: {
    default: 'Artivism - Where Art Meets Activism',
    template: '%s | Artivism'
  },
  description: 'Bid to own the most iconic protests on artwork. Artivism transforms historic climate activism moments into collectible digital art pieces.',
  keywords: ['art activism', 'climate protest', 'digital art', 'NFT', 'contemporary art', 'protest art', 'climate action', 'art collection'],
  authors: [{ name: 'Artivism' }],
  creator: 'Artivism',
  publisher: 'Artivism',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://artivism.com',
    siteName: 'Artivism',
    title: 'Artivism - Where Art Meets Activism',
    description: 'Bid to own the most iconic protests on artwork. Transforming climate activism into collectible art.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Artivism - Iconic Protest Art Collection',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artivism - Where Art Meets Activism',
    description: 'Bid to own the most iconic protests on artwork',
    images: ['/twitter-image.jpg'],
    creator: '@artivism',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Artivism",
    "url": "https://artivism.com",
    "logo": "https://artivism.com/logo.png",
    "description": "Artivism transforms iconic climate activism moments into collectible digital art pieces",
    "sameAs": [
      "https://twitter.com/artivism",
      "https://instagram.com/artivism"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Artivism",
    "url": "https://artivism.com",
    "description": "Bid to own the most iconic protests on artwork",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://artivism.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        <div className="App">
          <Header />
          <main className="mt-14 pb-[calc(3.5rem+env(safe-area-inset-bottom))] px-0 max-w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}