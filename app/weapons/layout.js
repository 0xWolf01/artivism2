export const metadata = {
  title: 'Weapons of Art',
  description: 'Discover the tools of artistic revolution. From tomato soup to mashed potatoes, explore how everyday items became powerful symbols of climate activism.',
  keywords: ['art activism tools', 'protest materials', 'tomato soup protest', 'mashed potatoes activism', 'paint protest', 'climate action tools', 'activism supplies'],
  openGraph: {
    title: 'Weapons of Art | Artivism',
    description: 'The tools that transformed climate protests into art history',
    url: 'https://artivism.com/weapons',
    images: [
      {
        url: '/og-weapons.jpg',
        width: 1200,
        height: 630,
        alt: 'Artivism - Weapons of Artistic Revolution',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weapons of Art | Artivism',
    description: 'The tools that transformed climate protests into art history',
    images: ['/twitter-weapons.jpg'],
  },
}

export default function WeaponsLayout({ children }) {
  return children
}