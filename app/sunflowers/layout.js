export const metadata = {
  title: 'Van Gogh\'s Sunflowers Soup Protest',
  description: 'October 2022 - The tomato soup protest at National Gallery London that shocked the world. Van Gogh\'s Sunflowers meet modern activism.',
  keywords: ['Van Gogh', 'Sunflowers', 'tomato soup protest', 'National Gallery London', 'climate activism', 'art protest', 'Just Stop Oil', 'digital art', 'NFT'],
  authors: [{ name: 'Artivism' }],
  creator: 'Artivism',
  publisher: 'Artivism',
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: 'https://artivism.com/sunflowers',
    siteName: 'Artivism',
    title: 'Van Gogh\'s Sunflowers Soup Protest | Artivism',
    description: 'October 2022 - The tomato soup protest at National Gallery London that shocked the world. Van Gogh\'s Sunflowers meet modern activism.',
    images: [
      {
        url: '/assets/img/sunflowers-capitalism.jpg',
        width: 1200,
        height: 630,
        alt: 'Van Gogh Sunflowers Tomato Soup Protest - Climate Activism Art',
      }
    ],
    publishedTime: '2022-10-14T00:00:00.000Z',
    modifiedTime: '2022-10-14T00:00:00.000Z',
    section: 'Art Collection',
    tags: ['Van Gogh', 'Sunflowers', 'tomato soup', 'climate activism', 'National Gallery', 'London protest'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Van Gogh\'s Sunflowers Soup Protest | Artivism',
    description: 'October 2022 - The tomato soup protest at National Gallery London that shocked the world.',
    images: ['/assets/img/sunflowers-capitalism.jpg'],
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

export default function SunflowersLayout({ children }) {
  return children
}