export const metadata = {
  title: 'Virtual Exhibition',
  description: 'Experience the Artivism collection in our immersive virtual gallery. Walk through history where art and activism converge in a revolutionary digital space.',
  keywords: ['virtual exhibition', 'digital gallery', 'online art show', 'climate art exhibition', 'protest art display', 'interactive gallery', '3D art experience'],
  openGraph: {
    title: 'Virtual Exhibition | Artivism',
    description: 'Immersive digital gallery of iconic protest artworks',
    url: 'https://artivism.com/exhibition',
    images: [
      {
        url: '/og-exhibition.jpg',
        width: 1200,
        height: 630,
        alt: 'Artivism Virtual Exhibition',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Exhibition | Artivism',
    description: 'Immersive digital gallery of iconic protest artworks',
    images: ['/twitter-exhibition.jpg'],
  },
}

export default function ExhibitionLayout({ children }) {
  return children
}