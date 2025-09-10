export const metadata = {
  title: 'Death and Life - Klimt Protest',
  description: 'November 2022 - Climate activists\' protest at Leopold Museum Vienna. Gustav Klimt\'s masterpiece becomes canvas for climate action.',
  keywords: ['Gustav Klimt', 'Death and Life', 'Leopold Museum', 'climate protest', 'Vienna', 'art activism', 'fossil fuel protest', 'digital art', 'NFT'],
  authors: [{ name: 'Artivism' }],
  creator: 'Artivism',
  publisher: 'Artivism',
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: 'https://artivism.com/deathandlife',
    siteName: 'Artivism',
    title: 'Death and Life - Klimt Protest | Artivism',
    description: 'November 2022 - Climate activists\' protest at Leopold Museum Vienna. Gustav Klimt\'s masterpiece becomes canvas for climate action.',
    images: [
      {
        url: '/assets/img/deathandlife-capitalism.jpg',
        width: 1200,
        height: 630,
        alt: 'Death and Life Klimt Protest - Climate Activism Art',
      }
    ],
    publishedTime: '2022-11-15T00:00:00.000Z',
    modifiedTime: '2022-11-15T00:00:00.000Z',
    section: 'Art Collection',
    tags: ['Gustav Klimt', 'Death and Life', 'climate activism', 'Leopold Museum', 'Vienna protest'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Death and Life - Klimt Protest | Artivism',
    description: 'November 2022 - Climate activists\' protest at Leopold Museum Vienna. Gustav Klimt\'s masterpiece becomes canvas for climate action.',
    images: ['/assets/img/deathandlife-capitalism.jpg'],
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

export default function DeathAndLifeLayout({ children }) {
  return children
}