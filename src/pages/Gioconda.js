import React from 'react';
import ArtPiecePage from '../components/art/ArtPiecePage';
import { artPieces } from '../data/artPieces';

const Gioconda = () => {
  const piece = artPieces.gioconda;
  
  return <ArtPiecePage {...piece} />;
};

export default Gioconda;
