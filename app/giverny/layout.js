export const metadata = {
  title: 'Monet\'s Garden at Giverny',
  description: 'Experience Monet\'s impressionist paradise transformed through the lens of climate activism.',
  keywords: ['Claude Monet', 'Giverny', 'Garden at Giverny', 'impressionist', 'climate activism', 'red paint protest', 'art activism', 'digital art', 'NFT'],
  authors: [{ name: 'Artivism' }],
  creator: 'Artivism',
  publisher: 'Artivism',
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: 'https://artivism.com/giverny',
    siteName: 'Artivism',
    title: 'Monet\'s Garden at Giverny | Artivism',
    description: 'Experience Monet\'s impressionist paradise transformed through the lens of climate activism.',
    images: [
      {
        url: 'https://www.meisterdrucke.us/kunstwerke/1260px/Claude_Monet_-_The_Artists_Garden_in_Giverny_-_%28MeisterDrucke-1326270%29.jpg',
        width: 1200,
        height: 630,
        alt: 'Monet\'s Garden at Giverny - Climate Activism Art',
      }
    ],
    publishedTime: '2023-05-30T00:00:00.000Z',
    modifiedTime: '2023-05-30T00:00:00.000Z',
    section: 'Art Collection',
    tags: ['Claude Monet', 'Giverny', 'Garden', 'impressionist', 'climate activism', 'red paint'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monet\'s Garden at Giverny | Artivism',
    description: 'Experience Monet\'s impressionist paradise transformed through the lens of climate activism.',
    images: ['https://www.meisterdrucke.us/kunstwerke/1260px/Claude_Monet_-_The_Artists_Garden_in_Giverny_-_%28MeisterDrucke-1326270%29.jpg'],
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

export default function GivernyLayout({ children }) {
  return children
}