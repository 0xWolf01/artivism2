export const metadata = {
  title: 'Art Collection',
  description: 'Explore our curated collection of iconic protest artworks. Each piece represents a pivotal moment in climate activism history, transformed into collectible digital art.',
  keywords: ['art collection', 'protest art gallery', 'climate activism art', 'Gioconda protest', 'Sunflowers Van Gogh protest', 'Les Meules Monet', 'Death and Life Klimt'],
  openGraph: {
    title: 'Art Collection | Artivism',
    description: 'Explore iconic protest artworks from climate activism history',
    url: 'https://artivism.com/pieces',
    images: [
      {
        url: '/og-gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'Artivism Gallery - Protest Art Collection',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Art Collection | Artivism',
    description: 'Explore iconic protest artworks from climate activism history',
    images: ['/twitter-gallery.jpg'],
  },
}

export default function PiecesLayout({ children }) {
  return children
}