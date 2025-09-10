export const metadata = {
  title: 'Monet\'s Haystacks Mashed Potato Protest',
  description: 'October 2022 - Climate activists throw mashed potatoes at Monet\'s Les Meules. A pivotal moment in art activism history.',
  keywords: ['Claude Monet', 'Les Meules', 'Haystacks', 'mashed potatoes protest', 'climate activism', 'Potsdam', 'art protest', 'digital art', 'NFT'],
  authors: [{ name: 'Artivism' }],
  creator: 'Artivism',
  publisher: 'Artivism',
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: 'https://artivism.com/lesmeules',
    siteName: 'Artivism',
    title: 'Monet\'s Haystacks Mashed Potato Protest | Artivism',
    description: 'October 2022 - Climate activists throw mashed potatoes at Monet\'s Les Meules. A pivotal moment in art activism history.',
    images: [
      {
        url: '/assets/img/mashed-potatoes.webp',
        width: 1200,
        height: 630,
        alt: 'Monet Haystacks Mashed Potato Protest - Climate Activism Art',
      }
    ],
    publishedTime: '2022-10-23T00:00:00.000Z',
    modifiedTime: '2022-10-23T00:00:00.000Z',
    section: 'Art Collection',
    tags: ['Claude Monet', 'Les Meules', 'Haystacks', 'mashed potatoes', 'climate activism', 'Potsdam protest'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monet\'s Haystacks Mashed Potato Protest | Artivism',
    description: 'October 2022 - Climate activists throw mashed potatoes at Monet\'s Les Meules. A pivotal moment in art activism history.',
    images: ['/assets/img/mashed-potatoes.webp'],
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

export default function LesMeulesLayout({ children }) {
  return children
}