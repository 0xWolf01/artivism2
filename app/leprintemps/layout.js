export const metadata = {
  title: 'Springtime (Le Printemps)',
  description: 'Pierre-Auguste Cot\'s romantic masterpiece reimagined for the climate generation.',
  keywords: ['Pierre-Auguste Cot', 'Le Printemps', 'Springtime', 'romantic art', 'climate activism', 'spring protest', 'art activism', 'digital art', 'NFT'],
  authors: [{ name: 'Artivism' }],
  creator: 'Artivism',
  publisher: 'Artivism',
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: 'https://artivism.com/leprintemps',
    siteName: 'Artivism',
    title: 'Springtime (Le Printemps) | Artivism',
    description: 'Pierre-Auguste Cot\'s romantic masterpiece reimagined for the climate generation.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Monet_-_Le_Printemps%2C_1886.jpg',
        width: 1200,
        height: 630,
        alt: 'Springtime Le Printemps - Climate Activism Art',
      }
    ],
    publishedTime: '2024-03-21T00:00:00.000Z',
    modifiedTime: '2024-03-21T00:00:00.000Z',
    section: 'Art Collection',
    tags: ['Pierre-Auguste Cot', 'Le Printemps', 'Springtime', 'romantic art', 'climate activism'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Springtime (Le Printemps) | Artivism',
    description: 'Pierre-Auguste Cot\'s romantic masterpiece reimagined for the climate generation.',
    images: ['https://upload.wikimedia.org/wikipedia/commons/c/c3/Monet_-_Le_Printemps%2C_1886.jpg'],
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

export default function LePrintempsLayout({ children }) {
  return children
}