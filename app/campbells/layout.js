export const metadata = {
  title: 'Warhol\'s Campbell\'s Soup Activism',
  description: 'Andy Warhol\'s iconic pop art meets modern protest. When soup cans become symbols of revolution.',
  keywords: ['Andy Warhol', 'Campbell\'s Soup Cans', 'pop art', 'activism', 'blue paint protest', 'adhesive protest', 'art activism', 'digital art', 'NFT'],
  authors: [{ name: 'Artivism' }],
  creator: 'Artivism',
  publisher: 'Artivism',
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: 'https://artivism.com/campbells',
    siteName: 'Artivism',
    title: 'Warhol\'s Campbell\'s Soup Activism | Artivism',
    description: 'Andy Warhol\'s iconic pop art meets modern protest. When soup cans become symbols of revolution.',
    images: [
      {
        url: 'https://subastareal.es/uploads/subastareal.es/attachments/60681/andy-warhol-consomme-campbells-soup-2130.jpg',
        width: 1200,
        height: 630,
        alt: 'Warhol Campbell\'s Soup Cans Activism - Climate Activism Art',
      }
    ],
    publishedTime: '2022-12-03T00:00:00.000Z',
    modifiedTime: '2022-12-03T00:00:00.000Z',
    section: 'Art Collection',
    tags: ['Andy Warhol', 'Campbell\'s Soup', 'pop art', 'activism', 'blue paint', 'adhesive'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warhol\'s Campbell\'s Soup Activism | Artivism',
    description: 'Andy Warhol\'s iconic pop art meets modern protest. When soup cans become symbols of revolution.',
    images: ['https://subastareal.es/uploads/subastareal.es/attachments/60681/andy-warhol-consomme-campbells-soup-2130.jpg'],
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

export default function CampbellsLayout({ children }) {
  return children
}