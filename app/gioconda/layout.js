export const metadata = {
  title: 'Mona Lisa Cake Attack',
  description: 'May 2024 - A climate activist\'s cake protest at the Louvre transformed into digital art. Own this historic moment where activism met the world\'s most famous painting.',
  keywords: ['Mona Lisa', 'cake attack', 'Louvre protest', 'climate activism', 'Leonardo da Vinci', 'Gioconda', 'art protest', 'digital art', 'NFT'],
  authors: [{ name: 'Artivism' }],
  creator: 'Artivism',
  publisher: 'Artivism',
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: 'https://artivism.com/gioconda',
    siteName: 'Artivism',
    title: 'Mona Lisa Cake Attack | Artivism',
    description: 'May 2024 - A climate activist\'s cake protest at the Louvre transformed into digital art. Own this historic moment where activism met the world\'s most famous painting.',
    images: [
      {
        url: '/assets/img/gioconda-capitalism.jpg',
        width: 1200,
        height: 630,
        alt: 'Mona Lisa Cake Attack - Climate Activism Art',
      }
    ],
    publishedTime: '2024-05-01T00:00:00.000Z',
    modifiedTime: '2024-05-01T00:00:00.000Z',
    section: 'Art Collection',
    tags: ['Mona Lisa', 'climate activism', 'Louvre', 'cake protest', 'Leonardo da Vinci'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mona Lisa Cake Attack | Artivism',
    description: 'May 2024 - A climate activist\'s cake protest at the Louvre transformed into digital art.',
    images: ['/assets/img/gioconda-capitalism.jpg'],
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

export default function GiocondaLayout({ children }) {
  return children
}