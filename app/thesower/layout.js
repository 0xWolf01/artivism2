export const metadata = {
  title: 'Van Gogh\'s The Sower',
  description: 'Vincent van Gogh\'s The Sower - planting seeds of change through artistic activism.',
  keywords: ['Van Gogh', 'The Sower', 'pea soup protest', 'Van Gogh Museum', 'Amsterdam', 'climate activism', 'art protest', 'digital art', 'NFT'],
  authors: [{ name: 'Artivism' }],
  creator: 'Artivism',
  publisher: 'Artivism',
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: 'https://artivism.com/thesower',
    siteName: 'Artivism',
    title: 'Van Gogh\'s The Sower | Artivism',
    description: 'Vincent van Gogh\'s The Sower - planting seeds of change through artistic activism.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Vincent_van_Gogh_-_The_Sower_-_c._17-28_June_1888.jpg',
        width: 1200,
        height: 630,
        alt: 'Van Gogh The Sower - Climate Activism Art',
      }
    ],
    publishedTime: '2022-09-08T00:00:00.000Z',
    modifiedTime: '2022-09-08T00:00:00.000Z',
    section: 'Art Collection',
    tags: ['Van Gogh', 'The Sower', 'pea soup', 'climate activism', 'Van Gogh Museum', 'Amsterdam protest'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Van Gogh\'s The Sower | Artivism',
    description: 'Vincent van Gogh\'s The Sower - planting seeds of change through artistic activism.',
    images: ['https://upload.wikimedia.org/wikipedia/commons/a/af/Vincent_van_Gogh_-_The_Sower_-_c._17-28_June_1888.jpg'],
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

export default function TheSowerLayout({ children }) {
  return children
}